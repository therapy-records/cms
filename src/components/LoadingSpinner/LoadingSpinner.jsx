import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Spinner = () => (
  <div className="sk-circle">
    <div className="sk-circle1 sk-child" />
    <div className="sk-circle2 sk-child" />
    <div className="sk-circle3 sk-child" />
    <div className="sk-circle4 sk-child" />
    <div className="sk-circle5 sk-child" />
    <div className="sk-circle6 sk-child" />
    <div className="sk-circle7 sk-child" />
    <div className="sk-circle8 sk-child" />
    <div className="sk-circle9 sk-child" />
    <div className="sk-circle10 sk-child" />
    <div className="sk-circle11 sk-child" />
    <div className="sk-circle12 sk-child" />
  </div>
);


class LoadingSpinner extends PureComponent {
  render() {
    const {
      active,
      fullScreen
    } = this.props;

    if (fullScreen) {
      return (
        <div className={active ? 'loading-spinner-overlay loading-spinner-overlay-active' : 'loading-spinner-overlay'}>
          {Spinner()}
        </div>
      )
    }

    return Spinner();

  }
}

LoadingSpinner.propTypes = {
  active: PropTypes.bool,
  fullScreen: PropTypes.bool
};

export default LoadingSpinner;
