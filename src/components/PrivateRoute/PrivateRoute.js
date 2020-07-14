import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loading, isAuth, component: Component, ...rest }) => {
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-2">Loading, please wait...</div>
        </div>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
