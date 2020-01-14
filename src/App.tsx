import React from "react";
import { Global, css } from "@emotion/core";
import { UsersList, KudosList } from "./components";

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            font-family: "Open Sans", sans-serif;
          }
        `}
      />
      <UsersList />
      <KudosList />
    </React.Fragment>
  );
};
