import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import { User } from "./users-list";
import {
  CellWrapper,
  AddButton,
  DeleteButton,
  Column,
  Row,
  FormWrapper,
  HeaderWrapper,
  RowWrapper,
  FormSection,
  StyledField,
  Heading,
  PageHeading
} from "./styled";

export interface Kudos {
  id: string;
  title: string;
  author: User;
  recipient: User;
}

interface KudosData {
  kudoses: Kudos[];
}

const GET_KUDOSES = gql`
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
  mutation AddKudos($title: String!, $authorId: ID, $recipientId: ID) {
    addKudos(title: $title, authorId: $authorId, recipientId: $recipientId) {
      id
      title
    }
  }
`;

const DELETE_KUDOS = gql`
  mutation DeleteKudos($id: ID!) {
    deleteKudos(id: $id) {
      id
    }
  }
`;

export const KudosList: React.FC = () => {
  const { loading, data } = useQuery<KudosData>(GET_KUDOSES);
  const [addKudos] = useMutation(ADD_KUDOS);
  const [deleteKudos] = useMutation(DELETE_KUDOS);

  return (
    <Column>
      <PageHeading>Kudos</PageHeading>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Row>
          <Column>
            <HeaderWrapper>
              <CellWrapper>Kudos id</CellWrapper>
              <CellWrapper>Kudos text</CellWrapper>
              <CellWrapper>Author</CellWrapper>
              <CellWrapper> Recipient</CellWrapper>
            </HeaderWrapper>

            {data &&
              data.kudoses &&
              data.kudoses.map((kudos: Kudos) => (
                <RowWrapper key={kudos.id}>
                  <CellWrapper>{kudos.id} </CellWrapper>
                  <CellWrapper>{kudos.title}</CellWrapper>
                  <CellWrapper>{kudos.author && kudos.author.name}</CellWrapper>
                  <CellWrapper>
                    {kudos.recipient && kudos.recipient.name}
                  </CellWrapper>
                </RowWrapper>
              ))}
          </Column>

          <FormSection>
            <FormWrapper>
              <Formik
                initialValues={{ title: "", authorId: "", recipientId: "" }}
                validate={values => {
                  return {};
                }}
                onSubmit={values => {
                  addKudos({
                    variables: {
                      title: values.title,
                      authorId: values.authorId,
                      recipientId: values.recipientId
                    }
                  });
                }}
              >
                {() => (
                  <Form>
                    <Column>
                      <Heading>Add kudos</Heading>
                      <StyledField
                        type="text"
                        name="title"
                        placeholder="title"
                      />
                      <StyledField
                        type="text"
                        name="authorId"
                        placeholder="authorId"
                      />
                      <StyledField
                        type="text"
                        name="recipientId"
                        placeholder="recipientId"
                      />
                      <AddButton type="submit"> Add kudos</AddButton>
                    </Column>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
            <FormWrapper>
              <Formik
                initialValues={{ kudosId: "" }}
                validate={values => {
                  return {};
                }}
                onSubmit={values => {
                  deleteKudos({ variables: { id: values.kudosId } });
                }}
              >
                {() => (
                  <Form>
                    <Heading>Delete kudos</Heading>
                    <Column>
                      <StyledField
                        type="text"
                        name="kudosId"
                        placeholder="kudosId"
                      />
                      <DeleteButton type="submit">Delete kudos</DeleteButton>
                    </Column>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
          </FormSection>
        </Row>
      )}
    </Column>
  );
};
