import React, { Component } from 'react';

import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';
import Event from 'js/components/Event';

import io from 'socket.io-client';

// If localhost
let socket = io(window.location.host);

// If HTTPS
if (window.location.protocol === 'https:') {
  socket = io('wss://' + window.location.host);
}

export default class Dashboard extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    socket.on('event', (data) => {
      const event = data;
      this.setState({ events: [...this.state.events, event] });
    });
  }

  render() {
    const title = 'Dashboard';
    const subTitle = 'Real-time notifications from Github.'

    return (
      <div className='app'>
        <Header />

        <div className='columns'>
          <div className='column is-2-desktop is-3-tablet'>
            <Sidebar />
          </div>

          <div className='column'>
            <Navbar />
            <Body title={title} subTitle={subTitle} />
            <br />

            {this.state.events.map((event, key) =>
              < Event key={key} event={event} />
            )}

          </div>
        </div>
      </div >
    );
  }
}