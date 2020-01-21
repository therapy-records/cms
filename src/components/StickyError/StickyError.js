import React from 'react';
import PropTypes from 'prop-types'
import './StickyError.css';

const StickyError = ({children}) => (
  <div className='sticky-new'>
    <div className='inner'>
      {children}
    </div>
  </div>
);

StickyError.propTypes = {
  children: PropTypes.element
};

export default StickyError;
