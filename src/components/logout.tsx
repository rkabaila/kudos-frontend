import * as React from "react";
import { Redirect } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import { routes } from "../App";
import { saveToken } from "../utils";

export const Logout = () => {
  const client = useApolloClient();
  saveToken("", client);

  return <Redirect to={routes.login.path} />;
};
