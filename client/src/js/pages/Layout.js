import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';

export default class Layout extends Component {
  render() {
    const pageTitle = "Home page";

    return (
      <div className="app">
        <Header />

        <div className="columns">
          <div className="column is-2">
            <Sidebar />
          </div>

          <div className="column">
            <Body pageTitle={pageTitle} />
            <a href="http://localhost:8000/auth/github" className="button is-info">Login</a>
          </div>
        </div>
      </div >
    );
  }
}