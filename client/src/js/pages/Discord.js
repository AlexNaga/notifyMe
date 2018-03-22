import React, { Component } from 'react';
import 'css/index.css';
import 'bulma/css/bulma.css'

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';

export default class Discord extends Component {
  render() {
    const title = 'Discord';
    const subTitle = 'Create a guest account to view the Discord channel.';

    return (
      <div className='app'>
        <Header />

        <div className='columns'>
          <div className='column is-2-desktop is-3-tablet'>
            <Sidebar />
          </div>

          <div className='column'>
            <Navbar />
            <Body title={title} subTitle={subTitle} />
            <br />
            <br />
            <a className='button is-info' href='https://discord.gg/UBbqPM9' target='_blank' rel='noopener noreferrer'>
              <span className='icon'>
                <i className='fas fa-external-link-square-alt' />
              </span>
              <span>View Discord channel</span>
            </a>
          </div>
        </div>
      </div >
    );
  }
}