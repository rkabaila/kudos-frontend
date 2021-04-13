import * as React from "react";
import { Global, css } from "@emotion/core";
import {
  UsersList,
  KudosList,
  Login,
  Home,
  AdminLogin,
  WithAuthentication,
  Column,
} from "./components";
import { routes } from "./constants";
import { BrowserRouter, Route } from "react-router-dom";
import { Logout } from "./components/logout";
import { useApolloClient } from "@apollo/react-hooks";

export const App: React.FC = () => {
  const client = useApolloClient();
  React.useMemo(() => {
    client.writeData({ data: { token: localStorage.getItem("token") } });
  }, [client]);

  return (
    <Column fullHeight>
      <Global
        styles={css`
          html,
          body,
          body {
            font-family: "Open Sans", sans-serif;
            margin: 0;
            height: 100%;
          }
        `}
      />
      <BrowserRouter>
        <Route path={routes.login} component={Login} exact />
        <Route path={routes.adminLogin} component={AdminLogin} exact />
        <Route path={routes.logout} component={Logout} />
        <Route
          path={routes.home}
          render={() => (
            <WithAuthentication>
              <Home />
            </WithAuthentication>
          )}
        />
        <Route
          path={routes.users}
          render={() => (
            <WithAuthentication>
              <UsersList />
            </WithAuthentication>
          )}
          secret
        />
        <Route
          path={routes.kudoses}
          render={() => (
            <WithAuthentication>
              <KudosList />
            </WithAuthentication>
          )}
          secret
        />
      </BrowserRouter>
    </Column>
  );
};
