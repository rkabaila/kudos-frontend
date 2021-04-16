import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-components";
import { setContext } from "apollo-link-context";
import { App } from "./App";
import { getToken } from "./utils";

const httpLink = createHttpLink({
  uri: "https://kudos-server.herokuapp.com/",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(WrappedApp, document.getElementById("root"));
