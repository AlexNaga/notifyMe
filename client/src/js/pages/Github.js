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
  return <div>
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
        name='issue'
        onChange={props.onChange}
        type='checkbox' />
      <label htmlFor={'issue' + props.id}>Issues</label>
      <input
        className='is-checkradio'
        id={'release' + props.id}
        name='release'
        type='checkbox' />
      <label htmlFor={'release' + props.id}>Releases</label>
      <input
        className='is-checkradio'
        id={'repository' + props.id}
        name='repository'
        type='checkbox' />
      <label htmlFor={'repository' + props.id}>Repositories</label>
      <input
        className='is-checkradio'
        id={'star' + props.id}
        name='star'
        type='checkbox' />
      <label htmlFor={'star' + props.id}>Stars</label>
    </div>
    <br />
  </div>
}

export default class Github extends Component {
  state = {
    organizations: [],
    issue: '',
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
        headers: { Authorization: "Bearer " + token },
        username: username
      })
      .then(res => {
        const organizations = res.data;
        this.setState({ organizations });
        this.setState({ isLoading: false });
      });
  }

  onChange = (event) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // get our form data out of state
    const { issue } = this.state;
    console.log(issue);
    

    request.post('http://localhost:8000/users/organizations', { issue })
      .then((result) => {
        console.log(result);
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
                  <form onSubmit={this.handleSubmit}>
                    {this.state.organizations.map((organization, key) =>
                      < Organization key={key} id={key} name={organization.name} onChange={this.onChange} />)
                    }
                    <button className="button is-success" type="submit">Save</button>
                  </form>
                </ul>
              </div>}
          </div>
        </div>
      </div >
    );
  }
}