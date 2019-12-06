import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Kudos } from "./kudos-list";
import { StyledRow, DataWrapper, AddButton, DeleteButton } from "./styled";

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

const GET_USER_OWN_KUDOS = gql`
  query {
    ownKudosByUser(userId: "ck35y0g9j00e50795h33k251s") {
      id
      title
    }
  }
`;

const GET_USER_WRITTEN_KUDOS = gql`
  query {
    writtenKudosByUser(userId: "ck35y0g9j00e50795h33k251s") {
      id
      title
    }
  }
`;

const ADD_USER = gql`
  mutation {
    addUser(name: "Test User") {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation {
    deleteUser(id: "ck3u9yct0008x07955ceiukym") {
      id
    }
  }
`;

export const UsersList: React.FC = () => {
  const { loading, data } = useQuery<UsersData>(GET_USERS);
  const { data: ownKudosData } = useQuery(GET_USER_OWN_KUDOS);
  const { data: writtenKudosData } = useQuery(GET_USER_WRITTEN_KUDOS);
  const [addUser, { data: addUserData }] = useMutation(ADD_USER);
  const [deleteUser, { data: deleteUserData }] = useMutation(DELETE_USER);
  console.log("ownKudosData", ownKudosData);
  console.log("writtenKudosData", writtenKudosData);

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
                  <StyledRow>
                    <DataWrapper> {user.id} </DataWrapper>
                    <DataWrapper>{user.name} </DataWrapper>
                    <DataWrapper>own kudos: {ownKudosText} </DataWrapper>
                    <DataWrapper>
                      {" "}
                      written kudos: {writtenKudosText}
                    </DataWrapper>
                  </StyledRow>
                </div>
              );
            })}
          <AddButton
            onClick={() => {
              addUser();
            }}
          >
            Add user
          </AddButton>
          <DeleteButton
            onClick={() => {
              deleteUser();
            }}
          >
            Delete user
          </DeleteButton>
        </div>
      )}
    </div>
  );
};
