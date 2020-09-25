import * as React from "react";
import { Global, css } from "@emotion/core";
import {
  UsersList,
  KudosList,
  Nav,
  Login,
  PrivateRoute,
  GET_TOKEN,
  Home,
} from "./components";
import { routes } from "./constants";
import { BrowserRouter, Route } from "react-router-dom";
import { Logout } from "./components/logout";
import { useQuery } from "@apollo/react-hooks";

export const App: React.FC = () => {
  const { data } = useQuery(GET_TOKEN);
  const isLoggedIn = data?.token;
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
        <Route path={routes.login} component={Login} />
        <Route path={routes.logout} component={Logout} />
        {isLoggedIn && <Nav />}
        {/* <PrivateRoute> */}
        <Route path={routes.home} component={Home} />
        {/* </PrivateRoute> */}
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
