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
      <div>
        <h1>
          <Link to='/' activeClassName='route--active'>Mini cms</Link>
        </h1>
        <Link to='/dashboard' activeClassName='route--active'>
          Dashbord
        </Link>
        {' | '}
        <Link to='/counter' activeClassName='route--active'>
          Counter
        </Link>
        {' | '}
        <Link to='/news' activeClassName='route--active'>
          News
        </Link>
        {' | '}
        {isAuthenticated ? (
          <button onClick={() =>  { onLogout(); this.redirectToHome(); }} className="btn-logout">Log out</button>
        ) : (
          <Link to='/' activeClassName='route--active'>Log in</Link>
        )}
      </div>
    )
  }
}

export default Header
