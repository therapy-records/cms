import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header.container'
import Unauthorised from '../../components/Unauthorised/Unauthorised'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children, location, isAuthenticated }) => {
  const isHomePage = location && location.pathname === '/';
  const isFullScreenView = isHomePage;
  const allowedUnAuthRoute = isHomePage;

  return (
    <div className={isFullScreenView ?
                    'container core-layout-main-container cancel-padding' :
                    'container core-layout-main-container'
                   }
    >

      <Header />

      <div className={allowedUnAuthRoute ? 'core-layout-full-screen' : 'core-layout'}>

        {(isAuthenticated || !isAuthenticated && allowedUnAuthRoute) && children}

        {(!isAuthenticated && !allowedUnAuthRoute) && <Unauthorised /> }

      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default CoreLayout
