import React from 'react';
import Typography from "@material-ui/core/Typography";

const Home = () => {
  return (
    <div>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Todo App
      </Typography>
      <Typography variant="subheading" align="center" color="textSecondary" paragraph>
        A simple to-do app to explore fullstack development, with Node.js and React.
      </Typography>
    </div>
  );
};

export default Home;