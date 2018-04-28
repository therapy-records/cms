import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, location, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuth ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/not-auth',
            state: { from: props.location }
          }} />
        )
    )} />
  )
}

export default ProtectedRoute;
