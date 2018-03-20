import React, { Component } from 'react';
import { Content } from 'reactbulma';
import { Image } from 'reactbulma';
import { Link } from 'reactbulma'
import { Media } from 'reactbulma';

import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';

import jwt from 'jsonwebtoken';
import io from 'socket.io-client';
const socket = io('ws://localhost:8000');

function Event(props) {
  console.log(props);
  const action = props.action;
  const date = props.date;
  const event = props.event;
  const icon = props.icon;
  const repo = props.repo;
  const text = props.text;
  const url = props.url;
  const user = props.user;

  return <div className='columns'>
    <div className='column is-narrow'>
      <div className='box'>
        <Media>
          <Media.Left>
            <Image is='64x64' src={user.image} alt='Image' />
          </Media.Left>
          <Media.Content>
            <Content>
              <p>
                <strong>{user.username}</strong> <small>{date}</small>
              </p>
              <p>
                <i className={icon + ' is-size-5'} ></i>
              </p>
              <p>
                {event + ' '}{action}:
                  <Link target='_blank' href={url}>
                  <strong>{' ' + repo}</strong>
                </Link>
              </p>
            </Content>
          </Media.Content>
        </Media>
      </div>
    </div>
    <br />
  </div >
}

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
      console.log(data);
      
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
                url={event.repo_url}
                user={event.user}
              />
            )}
          </div>
        </div>
      </div >
    );
  }
}