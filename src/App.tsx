import * as React from "react";
import { Global, css } from "@emotion/core";
import {
  Column,
  Login,
  AdminLogin,
  Home,
  Logout,
  KudosList,
  UsersList,
} from "./components";
import { Router, Switch } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import { Route } from "./components";
import { createBrowserHistory } from "history";
import { saveTokenToCache, getToken } from "./utils";

const history = createBrowserHistory();

export const routes = {
  users: {
    path: "/users",
    component: UsersList,
    auth: true,
  },
  kudoses: {
    path: "/kudoses",
    component: KudosList,
    auth: true,
  },
  home: {
    path: "/home",
    component: Home,
    auth: true,
  },
  login: {
    path: "/login",
    component: Login,
    auth: false,
  },
  adminLogin: {
    path: "/admin_login",
    component: AdminLogin,
    auth: false,
  },
  logout: {
    path: "/logout",
    component: Logout,
    auth: false,
  },
};

export const App = () => {
  const client = useApolloClient();
  React.useEffect(() => {
    const token = getToken();
    saveTokenToCache(token || "", client);
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
      <Router history={history}>
        <Switch>
          {Object.values(routes).map((route) => {
            const { path, component, auth } = route;

            return (
              <Route key={path} path={path} component={component} auth={auth} />
            );
          })}
        </Switch>
      </Router>
    </Column>
  );
};
