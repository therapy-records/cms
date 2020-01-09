import React from 'react';
import PropTypes from 'prop-types'
import './StickyNew.css';

const StickyNew = ({children}) => (
  <div className='sticky-new'>
    <div className='inner'>
      {children}
    </div>
  </div>
);

StickyNew.propTypes = {
  children: PropTypes.element
};

export default StickyNew;
