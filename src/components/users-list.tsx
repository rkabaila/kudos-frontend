import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Kudos } from "./kudos-list";
import {
  Row,
  DataWrapper,
  AddButton,
  DeleteButton,
  Column,
  FormWrapper
} from "./styled";
import { Form, Field, Formik } from "formik";

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
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UsersList: React.FC = () => {
  const { loading, data } = useQuery<UsersData>(GET_USERS);
  const { data: ownKudosData } = useQuery(GET_USER_OWN_KUDOS);
  const { data: writtenKudosData } = useQuery(GET_USER_WRITTEN_KUDOS);
  const [addUser] = useMutation(ADD_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  console.log("ownKudosData", ownKudosData);
  console.log("writtenKudosData", writtenKudosData);

  return (
    <Column>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Column>
          <Column>
            {data &&
              data.users.map((user: User) => {
                const ownKudosText = user.ownKudos
                  .map(kudos => kudos.title)
                  .join(", ");
                const writtenKudosText = user.writtenKudos
                  .map(kudos => kudos.title)
                  .join(", ");

                return (
                  <Column key={user.id}>
                    <Row>
                      <DataWrapper> {user.id} </DataWrapper>
                      <DataWrapper>{user.name} </DataWrapper>
                      <DataWrapper>own kudos: {ownKudosText} </DataWrapper>
                      <DataWrapper>
                        {" "}
                        written kudos: {writtenKudosText}
                      </DataWrapper>
                    </Row>
                  </Column>
                );
              })}
          </Column>
          <Row>
            <FormWrapper>
              <Formik
                initialValues={{ name: "" }}
                validate={values => {
                  return {};
                }}
                onSubmit={values => {
                  addUser({ variables: { name: values.name } });
                }}
              >
                {() => (
                  <Form>
                    <Column>
                      <Field type="text" name="name" placeholder="name" />
                      <AddButton type="submit"> Add user</AddButton>
                    </Column>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
            <FormWrapper>
              <Formik
                initialValues={{ userId: "" }}
                validate={values => {
                  return {};
                }}
                onSubmit={values => {
                  deleteUser({ variables: { id: values.userId } });
                }}
              >
                {() => (
                  <Form>
                    <Column>
                      <Field type="text" name="userId" placeholder="userId" />
                      <DeleteButton type="submit">Delete user</DeleteButton>
                    </Column>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
          </Row>
        </Column>
      )}
    </Column>
  );
};
