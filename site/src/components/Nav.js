import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Toggle from 'material-ui/Toggle';
import { white } from 'material-ui/styles/colors';

const style = {
  margin: 12,
};
class Nav extends Component {

  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({ logged: logged });
  };

  render() {
    return (
      <nav className="navbar navbar-default">
        <div>
          <div>
            <AppBar
              title=""
              iconElementLeft={<MainMenu />}
              iconElementRight={
                (isLoggedIn()) ? (<RaisedButton onClick={() => logout()} label="Logout" secondary={true} style={style}></RaisedButton>)
                  : (<RaisedButton onClick={() => login()} label="Login" primary={true} style={style}></RaisedButton>)
              }
            />
          </div>
        </div>
      </nav>

    );
  }
}

const MainMenu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MenuIcon color={white} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <Menu>
    <MenuItem primaryText={<Link className="navbar-brand" to="/">Home</Link>} />
      <MenuItem primaryText={
            (isLoggedIn()) ? <Link to="/foodjokes">Food Jokes</Link> : ''
          } />
      <MenuItem primaryText= {
              (isLoggedIn()) ? <Link to="/special">Celebrity Jokes</Link> : ''
            } />
      
    </Menu>
  </IconMenu>

);

MainMenu.muiName = 'IconMenu';

export default Nav;