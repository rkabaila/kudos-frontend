import React from "react";
import { RouteProps, Redirect, Route as ReactRoute } from "react-router-dom";
import { routes } from "../App";

interface Props extends RouteProps {
  auth: boolean;
}

export const Route = ({ auth, ...rest }: Props) => {
  const isAuthenticated = localStorage.getItem("token");

  return auth && !isAuthenticated ? (
    <Redirect to={routes.login.path} />
  ) : (
    <ReactRoute {...rest} />
  );
};
