import React from "react";
import { Column, StyledField, Heading, AddButton, Row } from "./styled";
import { Formik, Form } from "formik";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { routes } from "../constants";
import styled from "@emotion/styled";
import { GoogleLogin } from "react-google-login";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

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

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
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

const GoogleWrapper = styled(Column)`
  width: 200px;
  margin-left: 30px;
`;

const PageWrapper = styled(Row)`
  justify-content: center;
  align-items: center;
`;

//TODO move logic to utils, separate layer

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
  const [googleLogin] = useMutation(GOOGLE_LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      client.writeData({ data: { token: login.token } });
      history.push(routes.kudoses);
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
      <GoogleWrapper>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={(googleUser) => {
            const token = (googleUser as any).getAuthResponse().id_token;
            googleLogin({
              variables: {
                token,
              },
            });
            history.push(routes.home);
          }}
          onFailure={(error) => {
            console.log(error);
          }}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleWrapper>
    </PageWrapper>
  );
};
