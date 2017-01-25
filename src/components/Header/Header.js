import React from 'react'
import { Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>
      <Link to='/' activeClassName='route--active'>Mini cms</Link>
    </h1>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/news' activeClassName='route--active'>
      News
    </Link>
  </div>
)

export default Header
