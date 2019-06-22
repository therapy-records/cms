import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sticky from '../Sticky/Sticky';

export class GenericError extends PureComponent {
  render() {
    const { message } = this.props;

    if (!message) {
      return null;
    }

    return (
      <Sticky>
        {message}
      </Sticky>
    );
  }
}

GenericError.propTypes = {
  message: PropTypes.string
};

GenericError.defaultProps = {
  message: ''
};

const mapStateToProps = (state) => ({
  message: state.genericError.message
});

export const ConnectedGenericError = connect(
  mapStateToProps,
  null
)(GenericError);

export default ConnectedGenericError;
