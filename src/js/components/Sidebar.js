import React, { Component } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="app-sidebar menu">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li><a>Dashboard</a></li>
        </ul>
        <p className="menu-label">Administration</p>
        <ul className="menu-list">
          <li><a>Settings</a></li>
          <li>
            <a className="is-active">Manage Notifications</a>
            <ul>
              <li><a>Slack</a></li>
              <li><a>Github</a></li>
              <li><a>Raspberry Pi</a></li>
            </ul>
          </li>
        </ul>
      </aside>
    );
  }
}