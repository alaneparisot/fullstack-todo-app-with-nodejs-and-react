import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import Home from './components/Home';
import Navbar from './containers/Navbar';
import Register from './containers/Register';

import store from './redux/store';
import unsplashBadgeHTML from './assets/html/unsplashBadge';

const Routes = styled.div`
  margin-top: 10%;
`;

const Footer = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 1%;
  left: 0;
  z-index: -1;
`;

const UnsplashBadge = styled.div`
  display: inline;
  opacity: .1;
  &:hover {
    opacity: 1;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Grid container justify="center">
            <Navbar/>

            <Routes>
              <Route exact path="/" component={Home}/>
              <Route exact path="/register" component={Register}/>
            </Routes>

            <Footer>
              <UnsplashBadge dangerouslySetInnerHTML={{__html: unsplashBadgeHTML}}/>
            </Footer>
          </Grid>
        </Router>
      </Provider>
    );
  }
}

export default App;