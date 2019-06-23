import React from 'react';
import PropTypes from 'prop-types'
import './Sticky.css';

const Sticky = ({children}) => (
  <div className='sticky'>
    {children}
  </div>
);

Sticky.propTypes = {
  children: PropTypes.element
};

export default Sticky;
