import React, { Component } from 'react';
import { Content } from 'reactbulma';
import { Image } from 'reactbulma';
import { Link } from 'reactbulma'
import { Media } from 'reactbulma';

export default class Event extends Component {
  render() {
    const action = this.props.action;
    const date = this.props.date;
    const event = this.props.event;
    const icon = this.props.icon;
    const repo = this.props.repo;
    const url = this.props.url;
    const user = this.props.user;

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
}