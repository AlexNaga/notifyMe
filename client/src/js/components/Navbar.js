import React, { Component } from 'react';
import { Button } from 'reactbulma'

import jwt from 'jsonwebtoken';
import io from 'socket.io-client';
const socket = io('ws://localhost:8000');

export default class Navbar extends Component {
  state = {
    username: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username,
    };
  }

  componentDidMount() {
    let params = (new URL(document.location)).searchParams;
    let token = params.get('token');

    if (token) {
      const tokenDecoded = jwt.decode(token);

      this.setState({ isLoggedIn: true });
      this.setState({ username: tokenDecoded.username });

      localStorage.setItem('token', token);
      localStorage.setItem('username', tokenDecoded.username);
      window.history.pushState({}, document.title, '/');
    }

    socket.on('event', (data) => {
      const event = data;
      this.setState({ events: [...this.state.events, event] });
    });
  }

  onLogin = (event, data) => {
    window.location = 'http://localhost:8000/auth/github';
  }

  onLogout = (event, data) => {
    if (window.localStorage) {
      window.localStorage.clear();
    }

    this.setState({ username: '' });
    window.location = '/';
  }

  render() {
    return (
      <nav className='navbar is-transparent'>
        <div className='navbar-menu'>
          <div className='navbar-start'>
          </div>
          <div className='navbar-end'>
          </div>
        </div>
        <div className='navbar-brand'>
          <div className='navbar-burger right'>
          </div>

          {this.state.username ?
            <p className='navbar-item'>
              Hello, {this.state.username}
            </p>
            :
            <p className='navbar-item'></p>
          }

          <div className='navbar-item'>
            <div className='field is-grouped'>
              <p className='control'>

                {this.state.username ?
                  <Button info onClick={this.onLogout}>
                    <span className='icon'>
                      <i className='fas fa-sign-out-alt' />
                    </span>
                    <span>Logout</span>
                  </Button>
                  :
                  <Button info onClick={this.onLogin}>
                    <span className='icon'>
                      <i className='fas fa-sign-in-alt' />
                    </span>
                    <span>Login</span>
                  </Button>
                }

              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}