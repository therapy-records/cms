import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Header.scss'

class Header extends React.Component {

  // redirectToHome() {
  //   browserHistory.push('/');
  // }

  render() {
    const {
      isAuthenticated,
      onLogout
    } = this.props;

    return (
      <div className='header'>
        <h1>
          <Link to='/' activeClassName='route--active'>Fiona Ross CMS</Link>
        </h1>
        {isAuthenticated ? (
          <div className='header-nav'>
            <Link to='/dashboard' activeClassName='route--active'>
              Dashboard
            </Link>
            {' | '}
            <Link to='/news' activeClassName='route--active'>
              News
            </Link>
            {' | '}
            <Link to='/press' activeClassName='route--active'>
              Press
            </Link>
            {' | '}
            <Link to='/other-work' activeClassName='route--active'>
              Other Work
            </Link>
            {' | '}
            <button onClick={() => { onLogout(); this.redirectToHome(); }} className='btn-logout'>Log out</button>
          </div>
        ) : (
          <Link to='/' activeClassName='route--active'>Log in</Link>
        )}
      </div>
    )
  }
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogout: PropTypes.func.isRequired
};

export default Header;
