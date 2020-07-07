import * as React from "react";
import { routes } from "../constants";
import { Redirect } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

//TODO move to separate layer

export const Logout: React.FC = () => {
  const client = useApolloClient();
  client.writeData({ data: { token: "" } });
  localStorage.setItem("token", "");
  return <Redirect to={routes.login} />;
};
