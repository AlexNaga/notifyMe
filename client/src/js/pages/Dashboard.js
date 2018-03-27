import React, { Component } from 'react';
import { Message } from 'reactbulma'
import Spinner from 'react-spinkit';
import io from 'socket.io-client';
import moment from 'moment'
import request from 'axios';

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
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      token: '',
      isLoading: true,
      error: false,
      events: [],
      isAnimationActive: false,
    };
  }

  saveBeforeClose = () => {
    if (this.state.username) {
      let date = moment().format("dddd, MMMM Do YYYY, HH:mm:ss"); // Sunday, March 11th 2018, 18:14:21

      request.post(process.env.REACT_APP_SERVER_DOMAIN + '/users/logout', {
        username: this.state.username,
        lastVisit: date
      })
        .then((response) => {
        })
        .catch((err) => {
        });
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.saveBeforeClose);

    socket.on('event', (data) => {
      const event = data;
      this.setState({ events: [...this.state.events, event] });
      this.triggerAnimation();
    });

    this.cancelSource = request.CancelToken.source();

    if (localStorage.username) {
      this.setState({ username: localStorage.username });
      this.fetchEvents();
    } else {
      this.setState({ isLoading: false });
      this.setState({ error: true });
    }
  }

  componentWillUnmount() {
    this.cancelSource.cancel();
    this.saveBeforeClose();
    window.removeEventListener('beforeunload', this.saveBeforeClose);
  }

  fetchEvents = () => {
    request
      .post(process.env.REACT_APP_SERVER_DOMAIN + '/users/events', {
        headers: { Authorization: 'Bearer ' + localStorage.token },
        username: localStorage.username
      }, {
          cancelToken: this.cancelSource.token
        })
      .then(res => {
        const events = res.data;

        events.forEach(event => {
          this.setState({ events: [...this.state.events, event.event] });
        });

        this.setState({ isLoading: false });
        this.setState({ showEvents: true });
      })
      .catch(err => {
        if (request.isCancel(err)) {
          // Cancel request if component not mounted. This prevents sending unnecessary requests.
        } else {
          this.setState({ isLoading: false });
          this.setState({ error: true });
        }
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
                this.state.error ?
                  <div className='columns'>
                    <div className='column is-narrow'>
                      <Message warning>
                        <Message.Header>
                          <p>Authentication failed</p>
                        </Message.Header>
                        <Message.Body>
                          You need to be logged in to access this resource.
                    </Message.Body>
                      </Message>
                    </div>
                  </div>
                  : <div></div>
              }

              {
                this.state.showEvents ?
                  <div>
                    {
                      this.state.events.map((event, key) =>
                        < Event key={key} event={event} />)
                    }
                  </div>
                  : <div></div>
              }

              {this.state.isLoading ? <Spinner name='ball-clip-rotate' fadeIn='none' /> : <div> </div>}

            </div>
          </div>
        </div>
      </div >
    );
  }
}