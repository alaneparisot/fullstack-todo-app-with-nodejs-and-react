import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from "styled-components";

import Home from "./components/Home";
import Navbar from "./components/Navbar";

import unsplashBadgeHTML from "./assets/html/unsplashBadge";

const Routes = styled.div`
  margin-top: 10%;
`;

const Footer = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 1%;
  left: 0;
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
      <Router>
        <div>
          <Navbar/>

          <Routes>
            <Route exact path="/" component={Home}/>
          </Routes>

          <Footer>
            <UnsplashBadge dangerouslySetInnerHTML={{__html: unsplashBadgeHTML}}/>
          </Footer>
        </div>
      </Router>
    );
  }
}

export default App;