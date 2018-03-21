import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Organization extends Component {
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