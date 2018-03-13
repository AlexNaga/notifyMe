import React, { Component } from 'react';
// import NavLink from 'js/modules/NavLink';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="app-sidebar menu">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink exact to="/" activeClassName="is-active">Dashboard</NavLink>
          </li>
        </ul>
        <p className="menu-label">Manage Notifications</p>
        <ul className="menu-list">
          <li>
            <ul>
              <li>
                <NavLink to="/github" activeClassName="is-active">
                  <span className='icon'>
                    <i className='fab fa-github' />
                  </span>
                  <span>Github</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/slack" activeClassName="is-active">
                  <span className='icon'>
                    <i className='fab fa-slack-hash' />
                  </span>
                  <span>Slack</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    );
  }
}