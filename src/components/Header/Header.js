import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Header.css';

class Header extends React.Component {

  // redirectToHome() {
  //   browserHistory.push('/');
  // }

  redirectToHome() {
    return {};
  }

  render() {
    const {
      isAuthenticated,
      onLogout
    } = this.props;

    return (
      <div className='header'>
        <h1>
          <NavLink to='/' activeClassName='route--active'>Fiona Ross CMS</NavLink>
        </h1>
        {isAuthenticated ? (
          <div className='header-nav'>
            <NavLink to='/dashboard' activeClassName='route--active'>
              Dashboard
            </NavLink>
            {' | '}
            <NavLink to='/news' activeClassName='route--active'>
              News
            </NavLink>
            {' | '}
            <NavLink to='/press' activeClassName='route--active'>
              Press
            </NavLink>
            {' | '}
            <NavLink to='/other-work' activeClassName='route--active'>
              Other Work
            </NavLink>
            {' | '}
            <button onClick={() => { onLogout(); this.redirectToHome(); }} className='btn-logout'>Log out</button>
          </div>
        ) : (
          <NavLink to='/' activeClassName='route--active'>Log in</NavLink>
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
