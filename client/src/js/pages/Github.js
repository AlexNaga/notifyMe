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
import AutoForm from 'react-auto-form'

function Organization(props) {
  return <div className='field'>
    <input className='is-checkradio is-circle' type='checkbox' name={props.name} id={props.name} />
    <label className='title is-2' htmlFor={props.name}>{props.name}</label>
    <br />
    <br />

    <input className='is-checkradio' type='checkbox' name={props.name} value='issues' id={'issues' + props.id} />
    <label htmlFor={'issues' + props.id}>Issues</label>

    <input className='is-checkradio' type='checkbox' name={props.name} value='release' id={'releases' + props.id} />
    <label htmlFor={'releases' + props.id}>Releases</label>

    <input className='is-checkradio' type='checkbox' name={props.name} value='repository' id={'repositories' + props.id} />
    <label htmlFor={'repositories' + props.id}>Repositories</label>

    <input className='is-checkradio' type='checkbox' name={props.name} value='watch' id={'stars' + props.id} />
    <label htmlFor={'stars' + props.id}>Stars</label>
    <br />
    <br />
  </div>
}

export default class Github extends Component {
  state = {
    organizations: [],
  };

  constructor() {
    super();
    this.state = { isLoading: true };
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

  _onChange = (event, name, data, change) => {
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
    const pageTitle = 'Github Settings';
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
                  <AutoForm onChange={this._onChange} onSubmit={this._onSubmit} trimOnSubmit>
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