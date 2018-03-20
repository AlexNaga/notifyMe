import React, { Component } from 'react';
import { Content } from 'reactbulma';
import { Icon } from 'reactbulma'
import { Image } from 'reactbulma';
import { Level } from 'reactbulma'
import { Media } from 'reactbulma';

// import { Card } from 'reactbulma';
// import { SubTitle } from 'reactbulma';
// import { Title } from 'reactbulma';

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
  const event = props.event.event;
  const date = props.event.date;
  const repo = props.event.repo;
  const user = props.event.user;

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
                <strong>{user.username}</strong>   <small>{date}</small>
                <br />
                Starred repository: {repo}
              </p>
            </Content>
            <Level mobile>
              <Level.Left>
                <Level.Item>
                  <Icon small><i className='fas fa-exclamation' /></Icon>
                </Level.Item>
                <Level.Item>
                  <Icon small><i className='fas fa-check' /></Icon>
                </Level.Item>
                <Level.Item>
                  <Icon small><i className='fas fa-plus' /></Icon>
                </Level.Item>
                <Level.Item>
                  <Icon small><i className='fas fa-star' /></Icon>
                </Level.Item>
              </Level.Left>
            </Level>
          </Media.Content>
        </Media>
      </div>
    </div>
  </div >
}

export default class Index extends Component {
  state = {
    username: '',
    event: {
      event: '',
      date: '',
      repo: '',
      user: {
        username: '',
        image: ''
      }
    },
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
      this.setState({ event });
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

            {
              < Event event={this.state.event} />
            }

          </div>
        </div>
      </div >
    );
  }
}