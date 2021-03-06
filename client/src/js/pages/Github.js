import React, { Component } from 'react';
import { Button } from 'reactbulma'
import { Message } from 'reactbulma'
import AutoForm from 'react-auto-form'
import Spinner from 'react-spinkit';
import request from 'axios';
import 'css/bulma-checkradio.min.css';

import BodyTitle from 'js/components/BodyTitle';
import Header from 'js/components/Header';
import Navbar from 'js/components/Navbar';
import Sidebar from 'js/components/Sidebar';
import Organization from 'js/components/Organization';

export default class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username,
      token: localStorage.token,
      isLoading: true,
      error: false,
      organizations: [],
      showOrganizations: false,
    };
  }

  componentDidMount() {
    this.cancelSource = request.CancelToken.source();

    if (this.state.username) {
      this.fetchOrganizations();
    } else {
      this.setState({ isLoading: false });
      this.setState({ error: true });
    }
  }

  componentWillUnmount() {
    this.cancelSource.cancel()
  }

  fetchOrganizations = () => {
    request
      .post(process.env.REACT_APP_SERVER_DOMAIN + '/github/organizations', {
        headers: { Authorization: 'Bearer ' + this.state.token },
        username: this.state.username,
      }, {
          cancelToken: this.cancelSource.token
        })
      .then(res => {
        const organizations = res.data;
        this.setState({ isLoading: false });
        this.setState({ organizations });
        this.setState({ showOrganizations: true });
      })
      .catch(err => {
        if (request.isCancel(err)) {
          // Cancel request if component not mounted. This prevents sending unnecessary requests.
        } else {
          this.setState({ isLoading: false });
          this.setState({ error: true });
        }
      });
  }

  _onSubmit = (event, data) => {
    let username = localStorage.username;

    request.post(process.env.REACT_APP_SERVER_DOMAIN + '/users/organizations', {
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
            <div className='app-body'>
              <BodyTitle title={title} subTitle={subTitle} />
              <br />
              {
                this.state.error ?
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
                  : <div></div>
              }

              {
                this.state.showOrganizations ?
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
                  : <div></div>
              }

              {this.state.isLoading ? <Spinner name='ball-clip-rotate' fadeIn='none' /> : <div> </div>}

            </div>
          </div>
        </div>
      </div >
    );
  }
}