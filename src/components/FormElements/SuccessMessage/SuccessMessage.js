import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SuccessMessage = ({
  baseUrl,
  copy,
  onReset
}) => {

  const heading = copy.success || 'Success!';
  const showResetButton = (onReset && copy.createLink);

  return (
    <div>
      <h3>{heading} <small>🚀</small></h3>

      <div className='inline-flex'>

        <Link
          to={baseUrl}
          className='btn'
        >{copy.homeLink}
        </Link>

        {showResetButton && (
          <button
            onClick={onReset}
          >{copy.createLink}
          </button>
        )}

      </div>
    </div>
  );
}

SuccessMessage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  copy: PropTypes.shape({
    success: PropTypes.string,
    homeLink: PropTypes.string,
    createLink: PropTypes.string
  }).isRequired,
  onReset: PropTypes.func
};

SuccessMessage.defaultProps = {
  onReset: null
};

export default SuccessMessage;
