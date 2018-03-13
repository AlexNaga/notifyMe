import React, {Component} from 'react';

export default class Body extends Component {
  render() {
    return (
      <div className="app-body">
        <h1 className="title">This is the {this.props.pageTitle}</h1>
        <h1 className="subtitle">{this.props.pageSubTitle}</h1>
      </div>
    );
  }
}