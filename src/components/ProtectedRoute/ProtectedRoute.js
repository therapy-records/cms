import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, location, ...rest }) => {
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

export default ProtectedRoute;
