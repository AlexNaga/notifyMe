import React, { Component } from 'react';
import { swing } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  animation: {
    animation: 'x 0.7s',
    animationName: Radium.keyframes(swing, 'swing')
  }
};

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimationActive: false,
    };
  }

  triggerAnimation = () => {
    this.setState({ isAnimationActive: true }, () => {
      const self = this;
      setTimeout(() => self.setState({ isAnimationActive: false }), 1000);
    });
  }

  render() {
    return (
      <header className='app-header'>
        {
          this.props.isAnimationActive ?
            <StyleRoot>
              <i className='app-logo fas fa-bell' style={styles.animation}></i>
            </StyleRoot>
            :
            <div>
              {
                this.state.isAnimationActive ?
                  <StyleRoot>
                    <i className='app-logo fas fa-bell' style={styles.animation}></i>
                  </StyleRoot>
                  :
                  <p onClick={this.triggerAnimation}>
                    <i className='app-logo fas fa-bell'></i>
                  </p >
              }</div>
        }

        <h1 className='app-title'>notifyMe</h1>
      </header>
    );
  }
}