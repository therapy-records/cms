import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header.container'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container main-container'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.any
}

export default CoreLayout
