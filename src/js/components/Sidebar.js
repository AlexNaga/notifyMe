import React, { Component } from 'react';
// import NavLink from 'js/modules/NavLink';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="app-sidebar menu">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li><NavLink exact to="/" activeClassName="is-active">Dashboard</NavLink></li>          
        </ul>
        <p className="menu-label">Administration</p>
        <ul className="menu-list">
          <li><NavLink to="/settings" activeClassName="is-active">Settings</NavLink></li>
          <li>
            <a>Manage Notifications</a>
            <ul>
              <li><NavLink to="/slack" activeClassName="is-active">Slack</NavLink></li>
              <li><NavLink to="/github" activeClassName="is-active">Github</NavLink></li>
            </ul>
          </li>
        </ul>
      </aside>
    );
  }
}