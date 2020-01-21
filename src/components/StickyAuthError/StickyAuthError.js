import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sticky from '../Sticky/Sticky';

export class StickyAuthError extends PureComponent {
  render() {
    const { message } = this.props;

    if (!message) {
      return null;
    }

    return (
      <Sticky>
        <p>{message}</p>
      </Sticky>
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
