import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { User } from "./users-list";
import { StyledRow, DataWrapper, AddButton, DeleteButton } from "./styled";

export interface Kudos {
  id: string;
  title: string;
  author: User;
  recipient: User;
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
      recipient {
        id
        name
      }
    }
  }
`;

const ADD_KUDOS = gql`
  mutation {
    addKudos(title: "Test kudos") {
      id
      title
    }
  }
`;

const DELETE_KUDOS = gql`
  mutation {
    deleteKudos(id: "ck3u9yct0008x07955ceiukym") {
      id
    }
  }
`;

export const KudosList: React.FC = () => {
  const { loading, data } = useQuery<KudosData>(GET_KUDOS);
  const [addKudos, { data: addKudosData }] = useMutation(ADD_KUDOS);
  const [deleteKudos, { data: deleteKudosData }] = useMutation(DELETE_KUDOS);
  return (
    <div>
      <h3>Kudos</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {data &&
            data.kudoses.map((kudos: Kudos) => (
              <StyledRow key={kudos.id}>
                <DataWrapper>{kudos.id} </DataWrapper>
                <DataWrapper>{kudos.title}</DataWrapper>{" "}
                <DataWrapper>
                  written by {kudos.author && kudos.author.name}
                </DataWrapper>
                <DataWrapper>
                  sent to {kudos.recipient && kudos.recipient.name}
                </DataWrapper>
              </StyledRow>
            ))}
          <AddButton
            onClick={() => {
              addKudos();
            }}
          >
            Add kudos
          </AddButton>
          <DeleteButton
            onClick={() => {
              deleteKudos();
            }}
          >
            Delete kudos
          </DeleteButton>
        </div>
      )}
    </div>
  );
};
