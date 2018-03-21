import React, { Component } from 'react';

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';
import Organization from 'js/components/Organization';

import Spinner from 'react-spinkit';
import 'bulma/css/bulma.css'
import 'css/bulma-checkradio.min.css';
import 'css/index.css';

import request from 'axios';
import AutoForm from 'react-auto-form'

export default class Github extends Component {
  state = {
    organizations: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    let token = localStorage.token;
    let username = localStorage.username;

    request
      .post('http://localhost:8000/github/organizations', {
        headers: { Authorization: 'Bearer ' + token },
        username: username
      })
      .then(res => {
        const organizations = res.data;
        this.setState({ organizations });
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        // Show 'Not signed in' message to user
      });
  }

  _onSubmit = (event, data) => {
    let username = localStorage.username;

    request.post('http://localhost:8000/users/organizations', {
      data,
      username: username
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const title = 'Github Settings';
    const subTitle = 'Select which organizations to get notifications from.';

    return (
      <div className='app'>
        <Header />
        <div className='columns'>
          <div className='column is-2'>
            <Sidebar />
          </div>

          <div className='column'>
            <Navbar />
            <Body title={title} subTitle={subTitle} />
            <br />

            {this.state.isLoading ? <Spinner name='ball-clip-rotate' fadeIn='none' /> :
              <div id='organizationSettings'>
                <ul>
                  <AutoForm onSubmit={this._onSubmit} trimOnSubmit >
                    {this.state.organizations.map((organization, key) =>
                      < Organization key={key} id={key} name={organization.name} />
                    )}

                    <button className='button is-success' type='submit'>Save</button>
                  </AutoForm>
                </ul>
              </div>}

          </div>
        </div>
      </div >
    );
  }
}