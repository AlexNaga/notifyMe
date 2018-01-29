import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from './Body';
import Header from './Header';
import Sidebar from './Sidebar';

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
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