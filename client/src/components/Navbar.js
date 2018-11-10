import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Todo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;