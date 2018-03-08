import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';

export default class Github extends Component {
  render() {
    const pageTitle = "Github page";

    return (
      <div className="app">
        <Header />

        <div className="columns">
          <div className="column is-2">
            <Sidebar />
          </div>
          
          <div className="column">
            <Body pageTitle={pageTitle}/>
          </div>
        </div>
      </div >
    );
  }
}