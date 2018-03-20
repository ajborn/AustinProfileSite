import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';
import PopoverMenu from './PopoverMenu';

import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Toggle from 'material-ui/Toggle';
import Popover from 'material-ui/Popover';
import { white, black } from 'material-ui/styles/colors';

const style = {
  margin: 12,
};
const backgroundColor = {
  backgroundColor: 'black'
}
class Nav extends Component {
  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({ logged: logged });
  };
  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  setAnchor = (positionElement, position) => {
    const { anchorOrigin } = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin: anchorOrigin,
    });
  };

  setTarget = (positionElement, position) => {
    const { targetOrigin } = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin: targetOrigin,
    });
  };


  render() {
    return (
      <nav>
        <AppBar
          title=""
          style={backgroundColor}
          iconElementLeft={<MainMenu />}
          iconElementRight={
            (isLoggedIn()) ? (<RaisedButton onClick={() => logout()} label="Logout" secondary={true} style={style}></RaisedButton>)
              : (<RaisedButton onClick={() => login()} label="Login" primary={true} style={style}></RaisedButton>)}
        />
      </nav>
    );
  }
}

const MainMenu = (props, context) => (
  <IconMenu
    {...props}
    iconButtonElement={<IconButton><MenuIcon color={white} /></IconButton>
    }
    anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    <Menu>
      <MenuItem primaryText={"Home"} onClick={() => {
        window.location.assign('/');
      }} />
      {(isLoggedIn()) ? <MenuItem primaryText="FoodJokes" onClick={() => {
        window.location.assign('/foodjokes');
      }} />
        : ''}
      {(isLoggedIn()) ?
        <MenuItem primaryText={"Celebrity Jokes"} onClick={() => {
          window.location.assign('/special');
        }} />
        : ''}
      <MenuItem primaryText={"TwitterAPI"} onClick={() => {
        window.location.assign('/twitterapi');
      }} />
    </Menu>
  </IconMenu>

);

MainMenu.muiName = 'IconMenu';

export default Nav;