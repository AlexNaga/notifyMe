import React, { Component } from 'react';

import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';
import Event from 'js/components/Event';

import jwt from 'jsonwebtoken';
import io from 'socket.io-client';
const socket = io('ws://localhost:8000');

export default class Index extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    socket.on('token', (data) => {
      const token = jwt.decode(data);

      localStorage.setItem('token', data);
      localStorage.setItem('username', token.username);

      this.setState({ username: token.username });
    });

    socket.on('event', (data) => {
      const event = data;
      this.setState({ events: [...this.state.events, event] });
    });
  }

  render() {
    const pageTitle = 'Dashboard';

    return (
      <div className='app'>
        <Header />

        <div className='columns'>
          <div className='column is-2'>
            <Sidebar />
          </div>

          <div className='column'>
            <Navbar />
            <Body pageTitle={pageTitle} />

            {this.state.events.map((event, key) =>
              < Event key={key}
                action={event.action}
                date={event.date}
                event={event.event}
                icon={event.icon}
                repo={event.repo_name}
                text={event.text}
                url={event.url}
                user={event.user}
              />
            )}
          </div>
        </div>
      </div >
    );
  }
}