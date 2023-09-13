import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = Auth.user; // Check if the user is authenticated

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;
