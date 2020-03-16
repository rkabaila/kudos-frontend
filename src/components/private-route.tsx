import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../constants";

interface WithAuthenticationProps {
  children: JSX.Element;
}

export const WithAuthentication: React.FC<WithAuthenticationProps> = ({
  children
}) => {
  if (localStorage.getItem("token")) {
    return children;
  }

  return <Redirect to={routes.login} />;
};

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => (
  <Route
    {...rest}
    render={() =>
      localStorage.getItem("token") ? children : <Redirect to={routes.login} />
    }
  />
);
