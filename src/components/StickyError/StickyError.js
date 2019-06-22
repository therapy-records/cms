import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sticky from '../Sticky/Sticky';

export class StickyError extends PureComponent {
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

StickyError.propTypes = {
  message: PropTypes.string
};

StickyError.defaultProps = {
  message: ''
};

const mapStateToProps = (state) => ({
  message: state.genericError.message
});

export const ConnectedStickyError = connect(
  mapStateToProps,
  null
)(StickyError);

export default ConnectedStickyError;
