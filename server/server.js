'use strict';
const axios = require('axios');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const twitterAuth = `OAuth oauth_consumer_key="D1X5bwx6tF5rNcC9J6iPDfhqP",oauth_token="4686534691-KcECHY2gBOtIqSAKrCYVFDKpOgkb1yNw5e3CCwk",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1521437993",oauth_nonce="peQkEX9wZZM",oauth_version="1.0",oauth_signature="U%2FG%2BLtMLOWQPUO3tHmwZk0iBrgY%3D"`;
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
  let AboutMe = ["I am a software engineer/developer who is currently looking for a job working on desktop or web applications. My experience is in .NET, Javascript, ReactJS, and TSQL for my stack.  this website was created to demostrate my basic knowledge and understanding of a ReactJS app using authentication and a WebAPI to return data."];
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
app.get('/api/twitter/search/:searchterm', async (req, res) => {
  var searchterm = req.params.searchterm;
  const tData = await searchTweetData(searchterm)
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
async function searchTweetData(searchTerm) {
  const searchURL = `https://api.twitter.com/1.1/users/search.json?q=`;
  try {
    const data = await axios.get(url+searchTerm, { headers: { Authorization: twitterAuth } });
    return data;
  } catch (err) {
    console.log(err);
  }
}

app.listen(3333);

console.log('Listening on localhost:3333');