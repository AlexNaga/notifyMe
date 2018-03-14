import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';

import io from 'socket.io-client';
import jwt from 'jsonwebtoken';

export default class Index extends Component {
  componentDidMount() {
    const socket = io('ws://localhost:8000');
    socket.on('token', (data) => {
      const token = jwt.decode(data);

      localStorage.setItem('token', data);
      localStorage.setItem('username', token.username);
      // this.setState({ username: token.username });
    });
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