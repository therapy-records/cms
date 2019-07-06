import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.PureComponent {
  componentDidMount() {
    if (this.props.isAuth === null ||
        this.props.isAuth === false) {
      this.props.onAuthCheck();
    }
  }

  componentWillUpdate() {
    this.props.onAuthCheck();
  }

  render() {
    const {
      component: Component,
      isAuth,
      location,
      onAuthCheck,
      ...rest
    } = this.props;

    return (
      <Route {...rest} render={props => (
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
        )
      )} />
    )
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object,
  onAuthCheck: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
}

export default ProtectedRoute;
