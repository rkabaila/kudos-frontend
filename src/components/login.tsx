import React from "react";
import { Column, Row, Heading } from "./styled";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { GoogleLogin } from "react-google-login";
import { routes } from "../App";
import { saveToken } from "../utils";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

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

const GoogleWrapper = styled(Column)`
  width: 200px;
  margin: 50px;
`;

const HeadingWrapper = styled(Column)`
  margin-bottom: 20px;
`;

const PageWrapper = styled(Row)`
  justify-content: center;
  align-items: center;
`;

export const Login = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [googleLogin] = useMutation(GOOGLE_LOGIN, {
    onCompleted({ googleLogin }) {
      saveToken(googleLogin.token, client);
      history.push(routes.home.path);
    },
  });
  return (
    <PageWrapper>
      <GoogleWrapper>
        <HeadingWrapper>
          <Heading>Login with:</Heading>
        </HeadingWrapper>
        <GoogleLogin
          clientId={clientId}
          hostedDomain="telesoftas.com"
          buttonText="Login"
          onSuccess={(googleUser) => {
            const token = (googleUser as any).getAuthResponse().id_token;
            googleLogin({
              variables: {
                token,
              },
            });
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
