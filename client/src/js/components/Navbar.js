import React, { Component } from 'react';

export default class Navbar extends Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount() {

  }

  render() {
    return (
      <nav className='navbar is-transparent'>
        <div id='navbarExampleTransparentExample' className='navbar-menu'>
          <div className='navbar-start'>

          </div>
          <div className='navbar-end'>
            <p className='navbar-item'>
              Hello,
            </p>

            <div className='navbar-item'>
              <div className='field is-grouped'>
                <p className='control'>

                  {this.state.isLoggedIn ?
                    <a className='button is-info' href='http://localhost:8000/auth/github'>
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
        </div>
      </nav>
    );
  }
}