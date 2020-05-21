import React from "react";
import { Column, StyledField, Heading, AddButton } from "./styled";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { routes } from "../constants";
import styled from "@emotion/styled";

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

export const Login: React.FC = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      client.writeData({ data: { token: login.token } });
      history.push(routes.kudoses);
    },
    onError(error) {},
  });
  return (
    <Column>
      <Formik
        initialValues={{ name: "", password: "" }}
        validate={(values) => {
          return {};
        }}
        onSubmit={(values) => {
          login({
            variables: {
              name: values.name,
              password: values.password,
            },
          });
        }}
      >
        {() => (
          <Form>
            <FormWrapper>
              <Heading>Login</Heading>
              <StyledField type="text" name="name" placeholder="name" />
              <StyledField
                type="password"
                name="password"
                placeholder="password"
              />
              <ButtonWrapper>
                <AddButton type="submit"> Login</AddButton>
              </ButtonWrapper>
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </Column>
  );
};
