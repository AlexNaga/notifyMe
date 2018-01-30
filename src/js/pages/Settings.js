import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';

export default class Settings extends Component {
  render() {
    return (
      <div className="app">
        <Header />

        <div class="columns">
          <div class="column is-2">
            <Sidebar />
          </div>

          <div class="column">
            <Body />
            <h1 class="title">This is the settings body</h1>
          </div>
        </div>
      </div >
    );
  }
}