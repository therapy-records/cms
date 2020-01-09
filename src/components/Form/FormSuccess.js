import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormSuccess = ({ formRoute }) => (
  <div>
    <h3>Success! <small>🚀</small></h3>

    <div className='inline-flex'>

      <Link
        to={`/${formRoute.toLowerCase()}`}
        className='btn'
      >Go to {formRoute}
      </Link>

      <button>
        Create another 
      </button>
    </div>
  </div>
);

FormSuccess.propTypes = {
  formRoute: PropTypes.string.isRequired
};

export default FormSuccess;
