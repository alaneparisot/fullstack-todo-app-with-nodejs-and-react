import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { compose } from "recompose";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

import { logoutUser } from '../redux/actions/authActions';

const AppName = styled(Typography)`
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  height: 100%;
  with: 100%;
  color: inherit;
  text-decoration-line: none;
`;

class Navbar extends Component {
  state = {
    menuIconEl: null,
  };

  handleMenuClick = (event) => {
    this.setState({menuIconEl: event.currentTarget});
  };

  handleMenuClose = (destination) => {
    this.setState({menuIconEl: null});

    if (destination === 'logout') {
      this.props.logoutUser(this.props.history);
    } else if (typeof destination === 'string') {
      this.props.history.push('/' + destination);
    }
  };

  render() {
    const {menuIconEl} = this.state;

    return (
      <AppBar position="static" color="default">
        <Toolbar>

          <AppName variant="h6" color="inherit">
            <StyledLink to="/">
              Todo App
            </StyledLink>
          </AppName>

          <IconButton color="inherit" onClick={this.handleMenuClick}>
            <MenuIcon/>
          </IconButton>

          <Menu
            anchorEl={menuIconEl}
            open={Boolean(menuIconEl)}
            onClose={this.handleMenuClose}
          >
            {!this.props.auth.isAuthenticated ? (
              <>
                <MenuItem onClick={() => this.handleMenuClose('login')}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => this.handleMenuClose('register')}>
                  Register
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => this.handleMenuClose('logout')}>
                Logout
              </MenuItem>
            )}
          </Menu>

        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// TODO: Use Hooks
export default compose(
  withRouter,
  connect(mapStateToProps, {logoutUser}),
)(Navbar);