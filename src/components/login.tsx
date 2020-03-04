import React from "react";
import { Column, FormWrapper, StyledField, Heading, AddButton } from "./styled";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGIN = gql`
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
  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
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
