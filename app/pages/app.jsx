import React, { Component } from 'react';
import HomePage from './home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Link to='/'>Home</Link>
          <Route exact path='/' component={HomePage}/>
        </div>
      </Router>
    );
  }
}