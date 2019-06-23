import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { userLogout } from '../../reducers/user'
import './styles.css';

export class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      windowWidth: undefined
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleResize = this.handleResize.bind(this)
    
  }

  toggleSidebar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const {
      location,
      onLogout
    } = this.props;
    const {
      isOpen,
      windowWidth
    } = this.state;

    const isHomeRoute = location.pathname === '/';

    const isLargeScreen = windowWidth >= 768;

    const isActive = (!isHomeRoute && (isOpen && !isLargeScreen)) ||
                     (!isHomeRoute && isLargeScreen) ||
                     (!isHomeRoute && isOpen);

    let sidebarClassName = 'sidebar';

    if (isActive && !isLargeScreen) {
      sidebarClassName = 'sidebar sidebar-active sidebar-box-shadow';
    } else if (isActive) {
      sidebarClassName = 'sidebar sidebar-active';
    }

    return (
      <div>

        <div
          className={(isActive && !isLargeScreen) ? 'sidebar-overlay active' : 'sidebar-overlay'}
          onClick={this.toggleSidebar}
        />

        <button
          onClick={this.toggleSidebar}
          className={isActive ? 'btn-burger active' : 'btn-burger'}
        >
          &#9776;
          <span className='sr-only'>Open Menu</span>
        </button>

        <aside className={sidebarClassName}>

          <button
            onClick={this.toggleSidebar}
            className='btn-close'
          >x
          </button>

          <h1>
            <NavLink to='/'>FR-CMS</NavLink>
          </h1>

          <NavLink to='/dashboard' activeClassName='route--active'>
            Dashboard
          </NavLink>

          <NavLink to='/news' activeClassName='route--active'>
            News
          </NavLink>

          <NavLink to='/journalism' activeClassName='route--active'>
            Journalism
          </NavLink>

          <NavLink to='/press' activeClassName='route--active'>
            Press
          </NavLink>

          <button onClick={() => { onLogout(); }} className='btn-logout'>Log out</button>

        </aside>
      </div>
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
