import React, { Component } from 'react';
import { Button } from 'reactbulma'
import { Message } from 'reactbulma'

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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      organizations: [],
      showOrganizations: false,
    };
  }

  componentDidMount() {
    let token = localStorage.token;
    let username = localStorage.username;

    request
      .post(window.location.host + '/api/github/organizations', {
        headers: { Authorization: 'Bearer ' + token },
        username: username
      })
      .then(res => {
        const organizations = res.data;
        this.setState({ isLoading: false });
        this.setState({ organizations });
        this.setState({ showOrganizations: true });
      })
      .catch(err => {
        this.setState({ error: true });
        this.setState({ isLoading: false });
      });
  }

  _onSubmit = (event, data) => {
    let username = localStorage.username;

    request.post(window.location.host + '/api/users/organizations', {
      data,
      username: username
    })
  }

  render() {
    const title = 'Github Settings';
    const subTitle = 'Select which organizations to get notifications from.';

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

            {this.state.error ?
              <div className='columns'>
                <div className='column is-narrow'>
                  <Message warning>
                    <Message.Header>
                      <p>Authentication failed</p>
                    </Message.Header>
                    <Message.Body>
                      You need to be logged in to access this resource.
                    </Message.Body>
                  </Message>
                </div>
              </div>
              : <div></div>}

            {this.state.showOrganizations ?
              <div id='organizationSettings'>
                <ul>
                  <AutoForm onSubmit={this._onSubmit} trimOnSubmit >
                    {this.state.organizations.map((organization, key) =>
                      < Organization key={key} id={key} name={organization.name} />
                    )}

                    <Button success type='submit'>
                      <span className='icon'>
                        <i className='fas fa-sign-in-alt' />
                      </span>
                      <span>Save</span>
                    </Button>
                  </AutoForm>
                </ul>
              </div>
              : <div></div>}

            {this.state.isLoading ? <Spinner name='ball-clip-rotate' fadeIn='none' /> : <div> </div>}

          </div>
        </div>
      </div >
    );
  }
}