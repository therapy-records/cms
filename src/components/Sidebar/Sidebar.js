import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { userLogout } from '../../reducers/user'
import './styles.css';

export class Sidebar extends React.Component {
  render() {
    const { location, onLogout } = this.props;

    if (location.pathname === '/') {
      return null;
    }

    return (
      <aside className='sidebar'>

        <h1>
          <NavLink to='/'>FR-CMS</NavLink>
        </h1>

        <NavLink to='/dashboard' activeClassName='route--active'>
          Dashboard
        </NavLink>

        <NavLink to='/news' activeClassName='route--active'>
          News
        </NavLink>

        <NavLink to='/press' activeClassName='route--active'>
          Press
            </NavLink>
        <NavLink to='/other-work' activeClassName='route--active'>
          Other Work
        </NavLink>

        <button onClick={() => { onLogout(); }} className='btn-logout'>Log out</button>

      </aside>
    );
  }
}

Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onLogout: () => userLogout()
}

export default withRouter(connect(null, mapDispatchToProps)(Sidebar))
