import * as React from "react";
import styled from "@emotion/styled";
import { Row } from "./styled";
import { Link } from "react-router-dom";
import { routes } from "../constants";
import { RequireRole } from "./require-role";

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
    <RequireRole role="admin">
      <StyledLink to={routes.users}>Users</StyledLink>
    </RequireRole>
    <RequireRole role="admin">
      <StyledLink to={routes.kudoses}>Kudoses</StyledLink>
    </RequireRole>
    <StyledLink to={routes.logout}>Logout</StyledLink>
  </StyledNav>
);
