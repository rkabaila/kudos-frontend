import * as React from "react";
import { routes } from "../constants";
import { Redirect } from "react-router-dom";

export const Logout: React.FC = () => {
  localStorage.setItem("token", "");
  return <Redirect to={routes.login} />;
};
