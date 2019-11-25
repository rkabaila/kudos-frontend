import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Kudos } from "./kudos-list";

export interface User {
  id: string;
  name: string;
  ownKudos: Kudos[];
  writtenKudos: Kudos[];
}

interface UsersData {
  users: User[];
}

const GET_USERS = gql`
  query {
    users {
      id
      name
      ownKudos {
        id
        title
      }
      writtenKudos {
        id
        title
      }
    }
  }
`;

export const UsersList: React.FC = () => {
  const { loading, data } = useQuery<UsersData>(GET_USERS);

  return (
    <div>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {data &&
            data.users.map((user: User) => {
              const ownKudosText = user.ownKudos
                .map(kudos => kudos.title)
                .join();
              const writtenKudosText = user.writtenKudos
                .map(kudos => kudos.title)
                .join();

              return (
                <div key={user.id}>
                  {user.name} own kudos: {ownKudosText} written kudos:{" "}
                  {writtenKudosText}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
