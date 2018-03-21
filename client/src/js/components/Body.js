import React, { Component } from 'react';

export default class Body extends Component {
  render() {
    return (
      <div className='app-body'>
        <h1 className='title'>{this.props.title}</h1>
        <h1 className='subtitle'>{this.props.subTitle}</h1>
      </div>
    );
  }
}