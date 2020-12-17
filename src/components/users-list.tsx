import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Kudos } from "./kudos-list";
import {
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
  PageHeading,
} from "./styled";
import { Form, Formik } from "formik";
import { RequireRole } from "./require-role";
import { Nav } from "./nav";

export interface User {
  id: string;
  slackId: string;
  name: string;
  email: string;
  role: string;
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
      email
      role
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

const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $slackId: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    addUser(
      name: $name
      slackId: $slackId
      email: $email
      password: $password
      role: $role
    ) {
      id
      name
      email
      slackId
      role
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
      const users = data?.users ? data.users.concat(addUser) : [addUser];
      cache.writeQuery({
        query: GET_USERS,
        data: { users },
      });
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const data: UsersData | null = cache.readQuery({ query: GET_USERS });
      const users = data?.users.filter((user) => user.id !== deleteUser.id);
      cache.writeQuery({
        query: GET_USERS,
        data: { users },
      });
    },
  });

  return (
    <RequireRole role="admin">
      <>
        <Nav />
        <Column>
          <PageHeading>Users</PageHeading>
          {loading ? (
            <p>Loading ...</p>
          ) : (
            <Column>
              <HeaderWrapper>
                <CellWrapper>User id</CellWrapper>
                <CellWrapper>User slack id</CellWrapper>
                <CellWrapper>User name</CellWrapper>
                <CellWrapper>Email</CellWrapper>
                <CellWrapper>Role</CellWrapper>
                <CellWrapper>Own kudos</CellWrapper>
                <CellWrapper>Written kudos</CellWrapper>
              </HeaderWrapper>

              {data?.users.map((user: User) => {
                const ownKudosText = user.ownKudoses
                  .map((kudos) => kudos.text)
                  .join(", ");
                const writtenKudosText = user.writtenKudoses
                  .map((kudos) => kudos.text)
                  .join(", ");

                return (
                  <RowWrapper key={user.id}>
                    <CellWrapper>{user.id}</CellWrapper>
                    <CellWrapper>{user.slackId}</CellWrapper>
                    <CellWrapper>{user.name}</CellWrapper>
                    <CellWrapper>{user.email}</CellWrapper>
                    <CellWrapper>{user.role}</CellWrapper>
                    <CellWrapper>{ownKudosText}</CellWrapper>
                    <CellWrapper>{writtenKudosText}</CellWrapper>
                  </RowWrapper>
                );
              })}

              <FormSection>
                <FormWrapper>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      slackId: "",
                      password: "",
                      role: "user",
                    }}
                    validate={(values) => {
                      return {};
                    }}
                    onSubmit={(values) => {
                      addUser({
                        variables: {
                          name: values.name,
                          email: values.email,
                          slackId: values.slackId,
                          role: values.role,
                          password: values.password,
                        },
                      });
                    }}
                  >
                    {() => (
                      <Form>
                        <Column>
                          <Heading>Add user</Heading>
                          <StyledField
                            type="text"
                            name="name"
                            placeholder="name"
                          />
                          <StyledField
                            type="text"
                            name="email"
                            placeholder="email"
                          />
                          <StyledField
                            type="text"
                            name="password"
                            placeholder="password"
                          />
                          <StyledField
                            type="text"
                            name="slackId"
                            placeholder="slack id"
                          />
                          <StyledField as="select" name="role">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </StyledField>
                          <AddButton type="submit"> Add user</AddButton>
                        </Column>
                      </Form>
                    )}
                  </Formik>
                </FormWrapper>
                <FormWrapper>
                  <Formik
                    initialValues={{ userId: "" }}
                    validate={(values) => {
                      return {};
                    }}
                    onSubmit={(values) => {
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
      </>
    </RequireRole>
  );
};
