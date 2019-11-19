import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { User } from "./users-list";

interface Kudos {
  id: string;
  title: string;
  author: User;
}

interface KudosData {
  kudoses: Kudos[];
}

const GET_KUDOS = gql`
  query {
    kudoses {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

export const KudosList: React.FC = () => {
  const { loading, data } = useQuery<KudosData>(GET_KUDOS);
  return (
    <div>
      <h3>Kudos</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {data &&
            data.kudoses.map((kudos: Kudos) => (
              <div key={kudos.id}>
                {kudos.title} by {kudos.author.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
