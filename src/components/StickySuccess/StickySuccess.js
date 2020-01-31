import React from 'react';
import PropTypes from 'prop-types'
import './StickySuccess.css';

const StickySuccess = ({ children }) => {
  return (
    <div className='sticky-success'>
      <div className='inner'>
        {children}
      </div>
    </div>
  );
}

StickySuccess.propTypes = {
  children: PropTypes.element
};


export default StickySuccess;
