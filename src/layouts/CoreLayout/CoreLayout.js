import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header.container'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children, location }) => {
  const isFullScreenView = location && location.pathname === '/';
  return (
    <div className={isFullScreenView ?
                    'container core-layout-main-container cancel-padding' :
                    'container core-layout-main-container'
                   }
    >
      <Header />
      <div className={isFullScreenView ? 'core-layout-full-screen' : 'core-layout'}>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
}

export default CoreLayout
