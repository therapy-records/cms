import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SuccessMessage = ({
  baseUrl,
  copy,
  onReset
}) => {

  const heading = copy.success || 'Success!';
  const showCreateNew = (onReset && copy.createLink);

  return (
    <div>
      <h3>{heading} <small>🚀</small></h3>

      <div className='inline-flex'>

        <Link
          to={baseUrl}
          className='btn'
          onClick={onReset}
        >{copy.homeLink}
        </Link>

        {showCreateNew &&
          <Link
            to={`${baseUrl}/create`}
            className='btn'
            onClick={onReset}
          >{copy.createLink}
          </Link>
        }

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
