import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import 'css/bulma-checkradio.min.css';
import 'css/index.css';

import Body from 'js/components/Body';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';

import axios from 'axios';

function Organization(props) {
  return <form>
    <div className="field">
      <input className="is-checkradio is-circle" id={'checkbox' + props.id} type="checkbox" name={'checkbox' + props.id} />
      <label htmlFor={'checkbox' + props.id}>{props.name}</label>
    </div>

    <div className="field">
      <input className="is-checkradio" id={'checkradio' + props.id + '1'} type="checkbox" name={'checkradio' + props.id} />
      <label htmlFor={'checkradio' + props.id + '1'}>Option 1</label>
      <input className="is-checkradio" id={'checkradio' + props.id + '2'} type="checkbox" name={'checkradio' + props.id} />
      <label htmlFor={'checkradio' + props.id + '2'}>Option 2</label>
      <input className="is-checkradio" id={'checkradio' + props.id + '3'} type="checkbox" name={'checkradio' + props.id} />
      <label htmlFor={'checkradio' + props.id + '3'}>Option 3</label>
      <input className="is-checkradio" id={'checkradio' + props.id + '4'} type="checkbox" name={'checkradio' + props.id} />
      <label htmlFor={'checkradio' + props.id + '4'}>Option 4</label>
    </div>
    <br />
  </form>;
}

export default class Github extends Component {
  state = {
    organizations: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/github/organizations`)
      .then(res => {
        const organizations = res.data;
        this.setState({ organizations });
      })
  }

  render() {
    const pageTitle = "Github page";

    return (
      <div className="app">
        <Header />

        <div className="columns">
          <div className="column is-2">
            <Sidebar />
          </div>

          <div className="column">
            <Body pageTitle={pageTitle} />

            <ul>
              {this.state.organizations.map((organization, key) =>
                < Organization key={key} id={key} name={organization.name} />
              )}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}