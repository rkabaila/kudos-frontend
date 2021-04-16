import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const GET_TOKEN = gql`
  query GetToken {
    token @client
  }
`;

export const useToken = () => {
  const { data } = useQuery(GET_TOKEN);

  return data?.token;
};
