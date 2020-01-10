import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormSuccess = ({
  title,
  createCopy,
  onReset
}) => (
  <div>
    <h3>Success! <small>🚀</small></h3>

    <div className='inline-flex'>

      <Link
        to={`/${title.toLowerCase()}`}
        className='btn'
      >Go to {title}
      </Link>

      {onReset && 
        <button
          onClick={onReset}>
          {createCopy}
        </button>
      }

    </div>
  </div>
);

FormSuccess.propTypes = {
  title: PropTypes.string.isRequired,
  createCopy: PropTypes.string.isRequired,
  onReset: PropTypes.func
};

FormSuccess.defaultProps = {
  onReset: () => {}
};

export default FormSuccess;
