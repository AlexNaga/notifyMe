import React, { Component } from 'react';
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
  state = {
    organizations: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false
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
        this.setState({ error: true });
        // this.setState({ isLoading: false });
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
            :
              <div></div>
            }

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
              </div>
            }

          </div>
        </div>
      </div >
    );
  }
}