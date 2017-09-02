import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header.container'
import Unauthorised from '../../components/Unauthorised/Unauthorised'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children, location, isAuthenticated }) => {
  const isHomePage = location && location.pathname === '/';
  const allowedUnAuthRoute = isHomePage;
  const isFullScreenRoute = isHomePage;

  return (
    <div className='container core-layout-main-container'>

      <Header />

      <div className={isFullScreenRoute ? 'core-layout core-layout-full-screen' : 'core-layout'}>
        <div className={isFullScreenRoute ? '' : 'main-content-wrapper'}>
          <div className='main-content'>

            {(isAuthenticated || !isAuthenticated && allowedUnAuthRoute) && children}

            {(!isAuthenticated && !allowedUnAuthRoute) && <Unauthorised /> }

          </div>
        </div>
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
