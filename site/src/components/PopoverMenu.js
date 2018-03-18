import React from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import RaisedButton from 'material-ui/RaisedButton';
import RadioButton from 'material-ui/RadioButton';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';

const styles = {
  h3: {
    marginTop: 20,
    fontWeight: 400,
  },
  block: {
    display: 'flex',
  },
  block2: {
    margin: 10,
  },
  pre: {
    overflow: 'hidden', // Fix a scrolling issue on iOS.
  },
};

export default class PopoverExampleConfigurable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {"horizontal":"left","vertical":"bottom"},
      targetOrigin: {"horizontal":"left","vertical":"top"}
    };
  }

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
      <div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText={<Link to="/">Home</Link>} />
            {(isLoggedIn()) ? <MenuItem primaryText={<Link to="/foodjokes">Food Jokes</Link>} />
              : ''}
            {(isLoggedIn()) ?
              <MenuItem primaryText={<Link to="/special">Celebrity Jokes</Link>} />
              : ''}
          </Menu>
        </Popover>
      </div>
    );
  }
}