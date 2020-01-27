import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Kudos } from "./kudos-list";
import {
  Row,
  CellWrapper,
  AddButton,
  DeleteButton,
  Column,
  FormWrapper,
  HeaderWrapper,
  RowWrapper,
  FormSection,
  StyledField,
  Heading,
  PageHeading
} from "./styled";
import { Form, Formik } from "formik";

export interface User {
  id: string;
  slackId: string;
  name: string;
  ownKudoses: Kudos[];
  writtenKudoses: Kudos[];
}

interface UsersData {
  users: User[];
}

const GET_USERS = gql`
  query {
    users {
      id
      name
      slackId
      ownKudoses {
        id
        text
      }
      writtenKudoses {
        id
        text
      }
    }
  }
`;

const GET_USER_OWN_KUDOSES = gql`
  query {
    userOwnKudoses(userId: "ck41cz2v900o70795hidedvpy") {
      id
      text
    }
  }
`;

const GET_USER_WRITTEN_KUDOS = gql`
  query {
    userWrittenKudoses(userId: "ck41cz2v900o70795hidedvpy") {
      id
      text
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $slackId: String!) {
    addUser(name: $name, slackId: $slackId) {
      id
      name
      slackId
      ownKudoses {
        id
      }
      writtenKudoses {
        id
      }
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
  const [addUser] = useMutation(ADD_USER, {
    update(cache, { data: { addUser } }) {
      const data: UsersData | null = cache.readQuery({ query: GET_USERS });
      const users = data && data.users ? data.users.concat(addUser) : [addUser];
      cache.writeQuery({
        query: GET_USERS,
        data: { users }
      });
    }
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const data: UsersData | null = cache.readQuery({ query: GET_USERS });
      const users =
        data && data.users.filter(user => user.id !== deleteUser.id);
      cache.writeQuery({
        query: GET_USERS,
        data: { users }
      });
    }
  });

  return (
    <Column>
      <PageHeading>Users</PageHeading>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Column>
          <HeaderWrapper>
            <CellWrapper>User id</CellWrapper>
            <CellWrapper>User slack id</CellWrapper>
            <CellWrapper>User name </CellWrapper>
            <CellWrapper>Own kudos</CellWrapper>
            <CellWrapper>Written kudos</CellWrapper>
          </HeaderWrapper>

          {data &&
            data.users &&
            data.users.map((user: User) => {
              const ownKudosText = user.ownKudoses
                .map(kudos => kudos.text)
                .join(", ");
              const writtenKudosText = user.writtenKudoses
                .map(kudos => kudos.text)
                .join(", ");

              return (
                <RowWrapper key={user.id}>
                  <CellWrapper> {user.id} </CellWrapper>
                  <CellWrapper> {user.slackId} </CellWrapper>
                  <CellWrapper>{user.name} </CellWrapper>
                  <CellWrapper>{ownKudosText}</CellWrapper>
                  <CellWrapper>{writtenKudosText}</CellWrapper>
                </RowWrapper>
              );
            })}

          <FormSection>
            <FormWrapper>
              <Formik
                initialValues={{ name: "", slackId: "" }}
                validate={values => {
                  return {};
                }}
                onSubmit={values => {
                  addUser({
                    variables: { name: values.name, slackId: values.slackId }
                  });
                }}
              >
                {() => (
                  <Form>
                    <Column>
                      <Heading>Add user</Heading>
                      <StyledField type="text" name="name" placeholder="name" />
                      <StyledField
                        type="text"
                        name="slackId"
                        placeholder="slack id"
                      />
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
                      <Heading>Delete user</Heading>
                      <StyledField
                        type="text"
                        name="userId"
                        placeholder="userId"
                      />
                      <DeleteButton type="submit">Delete user</DeleteButton>
                    </Column>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
          </FormSection>
        </Column>
      )}
    </Column>
  );
};
