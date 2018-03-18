import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};
class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Home</Link>
        </div>
        <ul className="nav navbar-nav">
          <li> {
            (isLoggedIn()) ? <Link to="/">Food Jokes</Link> : '' 
          }
          </li>
          <li>
            {
              (isLoggedIn()) ? <Link to="/special">Celebrity Jokes</Link> : ''
            }

          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {
              (isLoggedIn()) ? (<RaisedButton onClick={() => logout()} label="Logout" secondary={true} style={style}></RaisedButton>)
                : (<RaisedButton onClick={() => login()} label="Login" primary={true} style={style}></RaisedButton>)
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;