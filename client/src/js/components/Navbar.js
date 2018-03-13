import React, { Component } from 'react';
const store = require('store');

export default class Navbar extends Component {
  componentDidMount() {
    let user = store.get('user');
    console.log(user);

    store.set('testUser', { name: 'Alex' });
    let testUser2 = store.get('testUser2');

    console.log(testUser2);
  }

  render() {
    let user = store.get('testUser');

    return (
      <nav className='navbar is-transparent'>
        <div id='navbarExampleTransparentExample' className='navbar-menu'>
          <div className='navbar-start'>
            <p className='navbar-item'>
              Hello, {user.name}
            </p>
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='field is-grouped'>
                <p className='control'>
                  <a className='button is-info' href='http://localhost:8000/auth/github'>
                    <span className='icon'>
                      <i className='fas fa-sign-in-alt' />
                    </span>
                    <span>Login</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}