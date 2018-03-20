import React, { Component } from 'react';

export default class Navbar extends Component {
  state = {
    isLoggedIn: false,
  }

  componentDidMount() {
    this.setState({ username: localStorage.username });
  }

  _onClick = (event, data) => {
    if (window.localStorage) {
      window.localStorage.clear();
    }

    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    this.setState({ username: '' });
    window.location = ''; // To refresh the page
  }

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-menu">
          <div className="navbar-start">
          </div>
          <div className="navbar-end">
          </div>
        </div>
        <div className="navbar-brand">
          <div className="navbar-burger right">
          </div>

          {this.state.username ?
            <p className='navbar-item'>
              Hello, {this.state.username}
            </p>
            :
            <p className='navbar-item'></p>
          }

          <div className='navbar-item'>
            <div className='field is-grouped'>
              <p className='control'>

                {this.state.username ?
                  <a className='button is-info' onClick={this._onClick}>
                    <span className='icon'>
                      <i className='fas fa-sign-out-alt' />
                    </span>
                    <span>Logout</span>
                  </a>
                  :
                  <a className='button is-info' href='http://localhost:8000/auth/github'>
                    <span className='icon'>
                      <i className='fas fa-sign-in-alt' />
                    </span>
                    <span>Login</span>
                  </a>
                }

              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}