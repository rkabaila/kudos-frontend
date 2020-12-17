import * as React from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../constants";
import gql from "graphql-tag";

export const GET_TOKEN = gql`
  query GetToken {
    token @client
  }
`;

interface Props {
  children: JSX.Element;
}

export const WithAuthentication: React.FC<Props> = ({ children }) =>
  localStorage.getItem("token") ? children : <Redirect to={routes.login} />;
