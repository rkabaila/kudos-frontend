import React from "react";
import { UsersList, KudosList } from "./components";

export const App: React.FC = () => {
  return (
    <div>
      <UsersList />
      <KudosList />
    </div>
  );
};
