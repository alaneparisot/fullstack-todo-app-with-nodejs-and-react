import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import Home from './components/Home';
import Navbar from './containers/Navbar';
import Login from './containers/Login';
import Register from './containers/Register';
import PrivateRoute from './components/common/PrivateRoute';
import Todos from './containers/Todos';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/authActions';
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

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Grid container justify="center">
            <Navbar/>

            <Routes>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Switch>
                <PrivateRoute exact path="/todos" component={Todos}/>
              </Switch>
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