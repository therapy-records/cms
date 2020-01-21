import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StickyAuthError.css';

export class StickyAuthError extends PureComponent {
  render() {
    const { message } = this.props;

    if (!message) {
      return null;
    }

    return (
      <div className='sticky-auth-error'>
        <p>{message}</p>
      </div>
    );
  }
}

StickyAuthError.propTypes = {
  message: PropTypes.string
};

StickyAuthError.defaultProps = {
  message: ''
};

const mapStateToProps = (state) => ({
  message: state.errorAlert.message
});

export const ConnectedStickyAuthError = connect(
  mapStateToProps,
  null
)(StickyAuthError);

export default ConnectedStickyAuthError;
