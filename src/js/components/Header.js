import React, { Component } from 'react';
import logo from 'img/logo.svg';

export default class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className="app-title">NotifyMe</h1>
      </header>
    );
  }
}