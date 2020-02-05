import React from 'react';
import PropTypes from 'prop-types'
import './StickyError.css';

const StickyError = ({
  message,
  error
}) => {
  let errorMessage = message;

  if (error && String(error).toLowerCase().includes('unauthorized')) {
    errorMessage = 'You are not authorized to perform this action.'
  }

  return (
    <div className='sticky-error'>
      <div className='inner'>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
};

StickyError.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.object
};

StickyError.defaultProps = {
  error: {}
};

export default StickyError;
