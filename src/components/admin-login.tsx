import React from "react";
import { Column, StyledField, Heading, AddButton, Row } from "./styled";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { routes } from "../App";

export const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const FormWrapper = styled(Column)`
  max-width: 350px;
  margin: 30px auto;
  height: 200px;
  justify-content: space-between;
`;

const ButtonWrapper = styled(Column)`
  align-self: flex-end;
`;

const PageWrapper = styled(Row)`
  justify-content: center;
  align-items: center;
`;

//TODO move logic to utils, separate layer

export const AdminLogin: React.FC = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      if (!login.user) {
        console.log("Wrong username or password.");
        return;
      }
      localStorage.setItem("token", login.token);
      client.writeData({ data: { token: login.token } });
      history.push(routes.kudoses.path);
    },
    onError(error) {},
  });

  return (
    <PageWrapper>
      <Formik
        initialValues={{ name: "", password: "" }}
        validate={(values) => {
          return {};
        }}
        onSubmit={(values) => {
          const { name, password } = values;
          login({
            variables: {
              name,
              password,
            },
          });
        }}
      >
        {() => (
          <Form>
            <FormWrapper>
              <Heading>Admin Login</Heading>
              <StyledField type="text" name="name" placeholder="name" />
              <StyledField
                type="password"
                name="password"
                placeholder="password"
              />
              <ButtonWrapper>
                <AddButton type="submit">Login</AddButton>
              </ButtonWrapper>
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};
