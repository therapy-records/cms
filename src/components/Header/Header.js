import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom'
import './Header.css';

export class Header extends React.Component {

  // redirectToHome() {
  //   browserHistory.push('/');
  // }

  redirectToHome() {
    return {};
  }

  render() {
    const {
      isAuthenticated,
      onLogout,
      location
    } = this.props;

    const isLoginPage = location && location.pathname === '/';

    return (
      <div className='header'>
        <h1>
          <NavLink to='/' activeClassName='route--active'>FR-CMS</NavLink>
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
          <div>
            {!isLoginPage &&
              <NavLink to='/' activeClassName='route--active'>Log in</NavLink>
            }
          </div>
        )}
      </div>
    )
  }
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogout: PropTypes.func.isRequired
};

export default withRouter(Header);
