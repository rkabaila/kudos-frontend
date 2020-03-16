import * as React from "react";
import { Global, css } from "@emotion/core";
import { UsersList, KudosList, Nav, Login, PrivateRoute } from "./components";
import { routes } from "./constants";
import { BrowserRouter, Route } from "react-router-dom";
import { Logout } from "./components/logout";

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            font-family: "Open Sans", sans-serif;
            margin: 0;
          }
        `}
      />
      <BrowserRouter>
        <Nav />
        <Route path={routes.login} component={Login} />
        <Route path={routes.logout} component={Logout} />
        <PrivateRoute>
          <Route path={routes.users} component={UsersList} />
        </PrivateRoute>
        <PrivateRoute>
          <Route path={routes.kudoses} component={KudosList} />
        </PrivateRoute>
      </BrowserRouter>
    </React.Fragment>
  );
};
