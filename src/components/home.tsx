import React from "react";
import {
  Column,
  HeaderWrapper,
  CellWrapper,
  RowWrapper,
  PageHeading,
  Heading,
} from "./styled";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Kudos } from "./kudos-list";
import styled from "@emotion/styled";

const GET_OWN_KUDOSES = gql`
  query {
    userOwnKudoses {
      id
      text
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

const GET_WRITTEN_KUDOSES = gql`
  query {
    userWrittenKudoses {
      id
      text
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

const TableWrapper = styled(Column)`
  margin: 20px 0 40px 0;
`;

export const Home = () => {
  const { loading: loadingOwnKudoses, data: ownKudoses } = useQuery(
    GET_OWN_KUDOSES
  );
  const { loading: loadingWrittenKudoses, data: writtenKudoses } = useQuery(
    GET_WRITTEN_KUDOSES
  );
  console.log(ownKudoses, writtenKudoses);
  return (
    <Column>
      <PageHeading>Home</PageHeading>

      <Heading>Own Kudoses</Heading>
      <TableWrapper>
        <HeaderWrapper>
          <CellWrapper>Kudos id</CellWrapper>
          <CellWrapper>Kudos text</CellWrapper>
          <CellWrapper>Author</CellWrapper>
          <CellWrapper> Recipient</CellWrapper>
        </HeaderWrapper>
        {ownKudoses?.userOwnKudoses.map((kudos: Kudos) => (
          <RowWrapper key={kudos.id}>
            <CellWrapper>{kudos.id} </CellWrapper>
            <CellWrapper>{kudos.text}</CellWrapper>
            <CellWrapper>{kudos.author.name}</CellWrapper>
            <CellWrapper>{kudos.recipient.name}</CellWrapper>
          </RowWrapper>
        ))}
      </TableWrapper>
      <Heading>Written Kudoses</Heading>
      <TableWrapper>
        <HeaderWrapper>
          <CellWrapper>Kudos id</CellWrapper>
          <CellWrapper>Kudos text</CellWrapper>
          <CellWrapper>Author</CellWrapper>
          <CellWrapper> Recipient</CellWrapper>
        </HeaderWrapper>
        {writtenKudoses?.userWrittenKudoses.map((kudos: Kudos) => (
          <RowWrapper key={kudos.id}>
            <CellWrapper>{kudos.id} </CellWrapper>
            <CellWrapper>{kudos.text}</CellWrapper>
            <CellWrapper>{kudos.author.name}</CellWrapper>
            <CellWrapper>{kudos.recipient.name}</CellWrapper>
          </RowWrapper>
        ))}
      </TableWrapper>
    </Column>
  );
};
