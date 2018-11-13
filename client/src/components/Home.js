import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { logoutUser } from '../redux/actions/authActions';

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration-line: none;
`;

const Home = (props) => {
  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <div>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Todo App
      </Typography>
      <Typography variant="subheading" align="center" color="textSecondary" paragraph>
        A simple to-do app to explore fullstack development, with Node.js and React.
      </Typography>

      {!props.auth.isAuthenticated ? (
        <Grid container spacing={16} justify="center">
          <Grid item>
            <StyledLink to="/login">
              <Button variant="outlined" color="default">
                Login
              </Button>
            </StyledLink>
          </Grid>
          < Grid item>
            < StyledLink to="/register">
              <Button variant="outlined" color="default">
                Register
              </Button>
            </StyledLink>
          </Grid>
        </Grid>
      ) : (
        <>
          <Typography variant="body2" align="center" color="textSecondary" paragraph>
            Logged in as {props.auth.user.email}
          </Typography>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button variant="outlined" color="default" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Home);