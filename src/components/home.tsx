import "react-tabs/style/react-tabs.css";
import React from "react";
import {
  Column,
  HeaderWrapper,
  CellWrapper,
  RowWrapper,
  PageHeading,
  Heading,
  KudosCard,
  KudosRow,
  KudosAuthor,
} from "./styled";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Kudos } from "./kudos-list";
import styled from "@emotion/styled";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Nav } from "./nav";
import { Loading } from "./loading";

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

const Wrapper = styled(Column)`
  max-width: 800px;
  margin: auto;
`;

export const Home = () => {
  const { loading: loadingOwnKudoses, data: ownKudoses } = useQuery(
    GET_OWN_KUDOSES
  );
  const { loading: loadingWrittenKudoses, data: writtenKudoses } = useQuery(
    GET_WRITTEN_KUDOSES
  );

  return (
    <>
      <Nav />
      <Wrapper fullHeight fullWidth>
        <PageHeading>Home</PageHeading>
        <Tabs>
          <TabList>
            <Tab>
              <Heading>
                Your Kudoses ({ownKudoses?.userOwnKudoses.length})
              </Heading>
            </Tab>
            <Tab>
              <Heading>
                You have sent Kudoses (
                {writtenKudoses?.userWrittenKudoses.length})
              </Heading>
            </Tab>
          </TabList>
          <TabPanel>
            <HeaderWrapper>
              <CellWrapper>Who wrote</CellWrapper>
              <CellWrapper>Kudos</CellWrapper>
            </HeaderWrapper>
            <Loading loading={loadingOwnKudoses}>
              {ownKudoses?.userOwnKudoses.map((kudos: Kudos) => (
                <KudosRow key={kudos.id}>
                  <KudosAuthor>{kudos.author.name}</KudosAuthor>
                  <KudosCard>{kudos.text}</KudosCard>
                </KudosRow>
              ))}
            </Loading>
          </TabPanel>
          <TabPanel>
            <HeaderWrapper>
              <CellWrapper>To Whom sent</CellWrapper>
              <CellWrapper>Kudos text</CellWrapper>
            </HeaderWrapper>
            <Loading loading={loadingWrittenKudoses}>
              {writtenKudoses?.userWrittenKudoses.map((kudos: Kudos) => (
                <RowWrapper key={kudos.id}>
                  <CellWrapper>{kudos.recipient.name}</CellWrapper>
                  <CellWrapper>{kudos.text}</CellWrapper>
                </RowWrapper>
              ))}
            </Loading>
          </TabPanel>
        </Tabs>
      </Wrapper>
    </>
  );
};
