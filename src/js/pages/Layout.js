import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';

export default class Layout extends Component {
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
          </div>
        </div>
      </div >
    );
  }
}