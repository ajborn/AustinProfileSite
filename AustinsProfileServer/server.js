'use strict';
const axios = require('axios');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const oAuth = require('OAuth');



const twitterKey = "D1X5bwx6tF5rNcC9J6iPDfhqP";
const twitterSecret = "DPt4rYnVwqtUzFnjSN7zMzrEMmNlRxRgeGNDg2TPkBPmSuQxbr";
const token = "4686534691-KcECHY2gBOtIqSAKrCYVFDKpOgkb1yNw5e3CCwk";
const token_secret = "MbKoEKvSMLlCMSsQtxSZwLQul95DH4YDaNeD1Y7PKmwfG"
const oauth_nonce = "WiFKcw7db1p";
const oauth_signature = "DUgWodV6FembhtOTqJlJWiz%2Bj6M%3D"
const oauth_signature_method = "HMAC-SHA1";
const oauth_timestamp = "1521569514";

const oauth_version = "1.0A";

var tOAuth = new oAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitterKey,//twitterKey
  twitterSecret,//twitterSecret
  oauth_version,
  true,
  oauth_signature_method
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const twitterAuth = `OAuth oauth_consumer_key="D1X5bwx6tF5rNcC9J6iPDfhqP",oauth_token="4686534691-KcECHY2gBOtIqSAKrCYVFDKpOgkb1yNw5e3CCwk",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1521569514",oauth_nonce="WiFKcw7db1p",oauth_version="1.0",oauth_signature="DUgWodV6FembhtOTqJlJWiz%2Bj6M%3D"`;
const twitterUrl = `https://api.twitter.com/1.1/users/search.json?q=singer`;
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
    jwksUri: "https://austinsapp.auth0.com/.well-known/jwks.json"
  }),
  // This is the identifier we set when we created the API
  audience: 'https://chucknorris-api.com',
  issuer: "https://austinsapp.auth0.com/",
  algorithms: ['RS256']
});

app.get('/api/jokes/food', (req, res) => {
  let foodJokes = [
    {
      id: 99991,
      joke: 'When Chuck Norris was a baby, he didnt suck his mothers breast.'
    },
    {
      id: 99992,
      joke: 'When Chuck Norris makes a burrito, its main ingredient is real toes.'
    },
    {
      id: 99993,
      joke: 'Chuck Norris eats steak for every single meal. Most times he forgets to kill the cow.'
    },
    {
      id: 99994,
      joke: "Chuck Norris doesn't believe in ravioli. He stuffs a live turtle with beef and smothers it in pig's blood."
    },
    {
      id: 99995,
      joke: "Chuck Norris recently had the idea to sell his urine as a canned beverage. We know this beverage as Red Bull."
    },
    {
      id: 99996,
      joke: 'When Chuck Norris goes to out to eat, he orders a whole chicken, but he only eats its soul.'
    }
  ];
  res.json(foodJokes);
})

app.get('/api/jokes/celebrity', authCheck, (req, res) => {
  let CelebrityJokes = [
    {
      id: 88881,
      joke: 'As President Roosevelt said: "We have nothing to fear but fear itself. And Chuck Norris."'
    },
    {
      id: 88882,
      joke: "Chuck Norris only let's Charlie Sheen think he is winning. Chuck won a long time ago."
    },
    {
      id: 88883,
      joke: 'Everything King Midas touches turnes to gold. Everything Chuck Norris touches turns up dead.'
    },
    {
      id: 88884,
      joke: 'Each time you rate this, Chuck Norris hits Obama with Charlie Sheen and says, "Who is winning now?!"'
    },
    {
      id: 88885,
      joke: "For Charlie Sheen winning is just wishful thinking. For Chuck Norris it's a way of life."
    },
    {
      id: 88886,
      joke: "Hellen Keller's favorite color is Chuck Norris."
    }
  ];
  res.json(CelebrityJokes);
})

app.get('/api/profile/aboutme', (req, res) => {
  let AboutMe = ["I am a software engineer/developer who is currently looking for a job working on desktop or web applications. My experience is in .NET, Javascript, ReactJS, and TSQL for my stack.  This website was created to demostrate my basic knowledge and understanding of a ReactJS app using authentication and a WebAPI to return data.  My Github link provides my latest projects that I have worked in my spare time. "];
  res.json(AboutMe);
})
app.get('/api/twitter/data', async (req, res) => {
  const tData = await getTweetData()
  try {
    res.json(tData.data);
  } catch (err) {
    console.log(err);
  }
})
async function getTweetData() {
  try {
    const data = await axios.get(twitterUrl, { headers: { Authorization: twitterAuth } });
    return data;
  } catch (err) {
    console.log(err);
  }
}

app.get('/api/twitter/search/:searchterm/:page/:count/', async (req, res) => {
  const searchterm = req.params.searchterm,
        page = req.params.page,
        count = req.params.count

  const tData = await searchTweetData(searchterm, page, count)
  
  try {
    res.json(tData);
  } catch (err) {
    console.log(err);
  }
})
// This is isn't declared as `async` because it already returns a promise
function delay() {
  // `delay` returns a promise
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function() {
      resolve(42); // After 3 seconds, resolve the promise with value 42
    }, 1000);
  });
}

async function searchTweetData(searchTerm, page, count) {
  const searchURL = `https://api.twitter.com/1.1/users/search.json?q=`;
  console.log("page: ", page);
  try {
   await tOAuth.get(
      searchURL + searchTerm + '&page=' + page +  '&count=' + count,
      token,
      token_secret,
      function (error, data, res) {
        if (error) console.error("error: ", error);
        tOAuth.data = data;
      }
    );
    await delay(2000);
    return JSON.parse(tOAuth.data)
    
  } catch (err) {
    console.log(err);
  }
}

app.listen(3333);

console.log('Listening on localhost:3333');