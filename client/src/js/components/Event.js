import React, { Component } from 'react';
import { Content } from 'reactbulma';
import { Image } from 'reactbulma';
import { Link } from 'reactbulma'
import { Media } from 'reactbulma';

export default class Event extends Component {
  render() {
    const action = this.props.event.action;
    const date = this.props.event.date;
    const event = this.props.event.event;
    const icon = this.props.event.icon;
    const repo = this.props.event.repo_name;
    const url = this.props.event.url;
    const user = this.props.event.user;

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