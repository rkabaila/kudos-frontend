import * as React from "react";
import styled from "@emotion/styled";
import { Row } from "./styled";
import { Link } from "react-router-dom";
import { routes } from "../constants";

const StyledNav = styled(Row)`
  justify-content: flex-end;
  background-color: #ededed;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 5px 20px;
  color: gray;
  font-weight: bold;
`;

export const Nav: React.FC = () => (
  <StyledNav>
    <StyledLink to={routes.users}>Users</StyledLink>
    <StyledLink to={routes.kudoses}>Kudoses</StyledLink>
    <StyledLink to={routes.logout}>Logout</StyledLink>
  </StyledNav>
);
