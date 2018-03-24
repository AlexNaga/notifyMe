import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className='app-sidebar menu'>
        <p className='menu-label'>&nbsp;General</p>
        <ul className='menu-list'>
          <li>
            <NavLink exact to='/' activeClassName='is-active'>
              <span className='icon'>
                <i className='fas fa-home' />
              </span>
              <span>&nbsp;Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/discord' activeClassName='is-active'>
              <span className='icon'>
                <i className='fab fa-slack-hash' />
              </span>
              <span>&nbsp;Discord</span>
            </NavLink>
          </li>
        </ul>
        <p className='menu-label'>&nbsp;Manage Notifications</p>
        <ul className='menu-list'>
          <li>
            <ul>
              <li>
                <NavLink to='/github' activeClassName='is-active'>
                  <span className='icon'>
                    <i className='fab fa-github' />
                  </span>
                  <span>&nbsp;Github</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    );
  }
}