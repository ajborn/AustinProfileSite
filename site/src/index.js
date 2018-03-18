import React from 'react';
import ReactDOM from 'react-dom';
import CelebrityJokes from './components/CelebrityJokes';
import FoodJokes from './components/FoodJokes';
import Profile from './components/Profile';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const Root = () => {
  return (
    <div>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Profile} />
          <Route path="/foodjokes" component={FoodJokes} onEnter={requireAuth} />
          <Route path="/special" component={CelebrityJokes} onEnter={requireAuth} />
          <Route path="/callback" component={Callback} />
        </Router>
      </MuiThemeProvider>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));