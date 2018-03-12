import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';

const queryString = require('query-string');

export default class Layout extends Component {
  render() {
    const pageTitle = "Home page";
    const accessToken = queryString.parse(this.props.location.search);
    console.log(accessToken);
    
    localStorage.setItem('access_token', JSON.stringify(accessToken));

    return (
      <div className="app">
        <Header />

        <div className="columns">
          <div className="column is-2">
            <Sidebar />
          </div>

          <div className="column">
            <Body pageTitle={pageTitle} />
            <a href="http://localhost:8000/auth/github" className="button is-success">Login</a>
          </div>
        </div>
      </div >
    );
  }
}