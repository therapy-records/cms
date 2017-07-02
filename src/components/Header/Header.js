import React from 'react'
import { Link, browserHistory } from 'react-router'
import './Header.scss'

class Header extends React.Component {

  redirectToHome(){
    browserHistory.push('/');
  }

  render() {
    const {
      isAuthenticated,
      onLogout
    } = this.props;

    return (
      <div className='header'>
        <h1>
          <Link to='/' activeClassName='route--active'>Mini cms</Link>
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
            <button onClick={() =>  { onLogout(); this.redirectToHome(); }} className="btn-logout">Log out</button>
          </div>
        ) : (
          <Link to='/' activeClassName='route--active'>Log in</Link>
        )}
      </div>
    )
  }
}

export default Header
