import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

interface User {
  id: string;
  name: string;
}

interface UsersData {
  users: User[];
}

const GET_USERS = gql`
  query {
    users {
      id
      name
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
            data.users.map((user: User) => (
              <div key={user.id}>{user.name}</div>
            ))}
        </div>
      )}
    </div>
  );
};
