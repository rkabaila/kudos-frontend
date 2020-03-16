import React from "react";
import { Column, FormWrapper, StyledField, Heading, AddButton } from "./styled";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { routes } from "../constants";

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

export const Login: React.FC = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      client.writeData({ data: { token: login.token } });
      history.push(routes.kudoses);
    }
  });
  return (
    <Column>
      <FormWrapper>
        <Formik
          initialValues={{ name: "", password: "" }}
          validate={values => {
            return {};
          }}
          onSubmit={values => {
            login({
              variables: {
                name: values.name,
                password: values.password
              }
            });
          }}
        >
          {() => (
            <Form>
              <Column>
                <Heading>Login</Heading>
                <StyledField type="text" name="name" placeholder="name" />
                <StyledField
                  type="text"
                  name="password"
                  placeholder="password"
                />
                <AddButton type="submit"> Login</AddButton>
              </Column>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Column>
  );
};
