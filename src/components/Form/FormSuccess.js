import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormSuccess = ({ formRoute, onReset }) => (
  <div>
    <h3>Success! <small>🚀</small></h3>

    <div className='inline-flex'>

      <Link
        to={`/${formRoute.toLowerCase()}`}
        className='btn'
      >Go to {formRoute}
      </Link>

      <button
        onClick={onReset}>
        Create another 
      </button>
    </div>
  </div>
);

FormSuccess.propTypes = {
  formRoute: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default FormSuccess;
