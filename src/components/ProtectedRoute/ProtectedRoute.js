import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.PureComponent {
  componentDidMount() {
    if (this.props.isAuth === null ||
        this.props.isAuth === false) {
      this.props.onAuthCheck();
    }
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

export default ProtectedRoute;
