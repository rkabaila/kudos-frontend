import React from "react";
import { Column, Row, Heading } from "./styled";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { routes } from "../constants";
import styled from "@emotion/styled";
import { GoogleLogin } from "react-google-login";

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

const PageWrapper = styled(Row)`
  justify-content: center;
  align-items: center;
`;

//TODO move logic to utils, separate layer

export const Login: React.FC = () => {
  const history = useHistory();
  const [googleLogin] = useMutation(GOOGLE_LOGIN, {
    onCompleted({ googleLogin }) {
      localStorage.setItem("token", googleLogin.token);
      history.push(routes.home);
    },
    onError(error) {},
  });
  return (
    <PageWrapper>
      <GoogleWrapper>
        <Heading>Login with:</Heading>
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
