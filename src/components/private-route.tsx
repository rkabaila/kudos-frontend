import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../constants";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const GET_TOKEN = gql`
  query GetToken {
    token @client
  }
`;

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const { data } = useQuery(GET_TOKEN);
  return (
    <Route
      {...rest}
      render={() =>
        data && data.token ? children : <Redirect to={routes.login} />
      }
    />
  );
};
