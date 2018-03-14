import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import 'css/bulma-checkradio.min.css';
import 'css/index.css';
import Spinner from 'react-spinkit';

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';

import request from 'axios';

function Organization(props) {
  return <form>
    <div className='field'>
      <input
        className='is-checkradio is-circle'
        id={'organization' + props.id}
        type='checkbox'
        name={'organization' + props.id} />
      <label className='title is-2' htmlFor={'organization' + props.id}>{props.name}</label>
    </div>

    <div className='field'>
      <input
        className='is-checkradio'
        id={'issue' + props.id}
        type='checkbox'
        name='issue' />
      <label htmlFor={'issue' + props.id}>Issues</label>
      <input
        className='is-checkradio'
        id={'release' + props.id}
        type='checkbox'
        name='release' />
      <label htmlFor={'release' + props.id}>Releases</label>
      <input
        className='is-checkradio'
        id={'repository' + props.id}
        type='checkbox'
        name='repository' />
      <label htmlFor={'repository' + props.id}>Repositories</label>
      <input
        className='is-checkradio'
        id={'star' + props.id}
        type='checkbox'
        name='star' />
      <label htmlFor={'star' + props.id}>Stars</label>
    </div>
    <br />
  </form>;
}

export default class Github extends Component {
  state = {
    organizations: []
  };

  constructor() {
    super();
    this.state = { isLoading: true }
  }

  componentDidMount() {
    let token = localStorage.token;
    let username = localStorage.username;

    request
      .post('http://localhost:8000/github/organizations', {
        headers: { Authorization: "Bearer " + token },
        username: username
      })
      .then(res => {
        const organizations = res.data;
        this.setState({ organizations });
        this.setState({ isLoading: false });
      });
  }

  render() {
    const pageTitle = 'Github page';
    const pageSubTitle = 'Select which organizations to get notifications from.';

    return (
      <div className='app'>
        <Header />
        <div className='columns'>
          <div className='column is-2'>
            <Sidebar />
          </div>

          <div className='column'>
            <Navbar />
            <Body pageTitle={pageTitle} pageSubTitle={pageSubTitle} />
            <br />

            {this.state.isLoading ? <Spinner name='ball-clip-rotate' fadeIn='none' /> :
              <div id='organizationSettings'>
                <ul>
                  {this
                    .state
                    .organizations
                    .map((organization, key) => < Organization key={
                      key
                    }
                      id={
                        key
                      }
                      name={
                        organization.name
                      } />)}
                </ul>
                <a className="button is-success">Save</a>
              </div>}
          </div>
        </div>
      </div >
    );
  }
}