import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  _onChange = (event, name, data, change) => {
    let checkboxes = ReactDOM.findDOMNode(this.refs.checkboxes)

    for (const checkbox in checkboxes.children) {
      if (checkboxes.children.hasOwnProperty(checkbox)) {
        const element = checkboxes.children[checkbox];
        element.disabled = this.state.isActive;
      }
    }

    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    return <div className='field'>
      <input className='is-checkradio is-circle' type='checkbox' name={this.props.name} id={this.props.name} onChange={this._onChange} />
      <label className='title is-2' htmlFor={this.props.name}>{this.props.name}</label>
      <br />
      <br />
      <div ref='checkboxes'>
        <input className='is-checkradio' type='checkbox' name={this.props.name} value='issues' id={'issues' + this.props.id} disabled />
        <label htmlFor={'issues' + this.props.id}>Issues</label>

        <input className='is-checkradio' type='checkbox' name={this.props.name} value='release' id={'releases' + this.props.id} disabled />
        <label htmlFor={'releases' + this.props.id}>Releases</label>

        <input className='is-checkradio' type='checkbox' name={this.props.name} value='repository' id={'repositories' + this.props.id} disabled />
        <label htmlFor={'repositories' + this.props.id}>Repositories</label>

        <input className='is-checkradio' type='checkbox' name={this.props.name} value='watch' id={'stars' + this.props.id} disabled />
        <label htmlFor={'stars' + this.props.id}>Stars</label>
      </div>
      <br />
      <br />
    </div >
  }
}

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