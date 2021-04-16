import React from "react";
import { RouteProps, Redirect, Route as ReactRoute } from "react-router-dom";
import { routes } from "../App";
import { useToken } from "../hooks";

interface Props extends RouteProps {
  auth: boolean;
}

export const Route = ({ auth, ...rest }: Props) => {
  const token = useToken();

  return auth && !token ? (
    <Redirect to={routes.login.path} />
  ) : (
    <ReactRoute {...rest} />
  );
};
