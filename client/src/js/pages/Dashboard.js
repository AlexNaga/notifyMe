import React, { Component } from 'react';
import io from 'socket.io-client';

import BodyTitle from 'js/components/BodyTitle';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';
import Event from 'js/components/Event';

// If HTTPS
let socket = io('wss://' + window.location.host);

// If HTTP
if (window.location.protocol === 'http:') {
  socket = io('ws://' + window.location.host);
}

export default class Dashboard extends Component {
  state = {
    events: [],
    isAnimationActive: false,
  }

  componentDidMount() {
    socket.on('event', (data) => {
      const event = data;
      this.setState({ events: [...this.state.events, event] });
      this.triggerAnimation();
    });
  }

  triggerAnimation = () => {
    this.setState({ isAnimationActive: true }, () => {
      const self = this;
      setTimeout(() => self.setState({ isAnimationActive: false }), 1000);
    });
  }

  render() {
    const title = 'Dashboard';
    const subTitle = 'Real-time notifications from Github.'

    return (
      <div className='app'>
        <Header isAnimationActive={this.state.isAnimationActive} />

        <div className='columns'>
          <div className='column is-2-desktop is-3-tablet'>
            <Sidebar />
          </div>

          <div className='column'>
            <Navbar />
            <div className='app-body'>
              <BodyTitle title={title} subTitle={subTitle} />
              <br />

              {
                this.state.events.map((event, key) =>
                  < Event key={key} event={event} />
                )
              }
            </div>
          </div>
        </div>
      </div >
    );
  }
}