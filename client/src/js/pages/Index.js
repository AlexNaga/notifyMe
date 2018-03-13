import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';

export default class Index extends Component {
  componentDidMount() {
    // localStorage.setItem('accessToken', parsed.access_token);
  }

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
            <Navbar />
            <Body pageTitle={pageTitle} />
          </div>
        </div>
      </div >
    );
  }
}