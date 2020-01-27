import * as React from "react";
import { Global, css } from "@emotion/core";
import { UsersList, KudosList, Nav } from "./components";
import { routes } from "./constants";
import { BrowserRouter, Route } from "react-router-dom";

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
        <Route path={routes.users} component={UsersList} />
        <Route path={routes.kudoses} component={KudosList} />
      </BrowserRouter>
    </React.Fragment>
  );
};
