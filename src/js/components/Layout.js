import React, { Component } from 'react';
import logo from 'img/logo.svg';
import 'css/App.css';
import 'bulma/css/bulma.css'

class Layout extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Notify App</h1>
        </header>

        <div class="columns">
          <div class="column is-2">
            <aside className="App-sidebar menu">
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
          </div>

          <div class="column">
            <h1 class="title">This is the content</h1>
          </div>
        </div>
      </div >
    );
  }
}

export default Layout;