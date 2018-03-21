import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';

export default class Slack extends Component {
  render() {
    const title = "Slack Settings";
    const subTitle = 'Select which organizations to get notifications from.';    

    return (
      <div className="app">
        <Header />

        <div className="columns">
          <div className="column is-2">
            <Sidebar />
          </div>

          <div className="column">
            <Navbar />          
            <Body title={title} subTitle={subTitle} />
          </div>
        </div>
      </div >
    );
  }
}