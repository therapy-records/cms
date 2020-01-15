import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormSuccess = ({
  baseUrl,
  copy,
  onReset
}) => {

  const showResetButton = (onReset && copy.homeLink);

  return (
    <div>
      <h3>Success! <small>🚀</small></h3>

      <div className='inline-flex'>

        <Link
          to={baseUrl}
          className='btn'
        >{copy.homeLink}
        </Link>

        {showResetButton &&
          <button
            onClick={onReset}
          >{copy.createLink}
          </button>
        }

      </div>
    </div>
  );
}

FormSuccess.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  copy: PropTypes.shape({
    homeLink: PropTypes.string,
    createLink: PropTypes.string
  }).isRequired,
  onReset: PropTypes.func
};

FormSuccess.defaultProps = {
  onReset: () => {}
};

export default FormSuccess;
