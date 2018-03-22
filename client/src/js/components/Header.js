import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className='app-header'>
        <i className='app-logo fas fa-bell'></i>
        <h1 className='app-title'>notifyMe</h1>
      </header>
    );
  }
}