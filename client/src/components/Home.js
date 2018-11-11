import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration-line: none;
`;

const Home = () => {
  return (
    <div>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Todo App
      </Typography>
      <Typography variant="subheading" align="center" color="textSecondary" paragraph>
        A simple to-do app to explore fullstack development, with Node.js and React.
      </Typography>

      <Grid container spacing={16} justify="center">
        <Grid item>
          <Button variant="outlined" color="default">
            <StyledLink to="/register">
              Register
            </StyledLink>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;