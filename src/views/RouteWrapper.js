import React from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "views/PrivateRoute";
import routes from "routes";

const RouteWrapper = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <PrivateRoute
          key={index}
          path={`${route.layout}${route.path}`}
          component={route.component}
        />
      ))}
      <Redirect from="/" to="/auth/sign-in" />{" "}
      {/* Redirect to a default route */}
    </Switch>
  );
};
export default RouteWrapper;
