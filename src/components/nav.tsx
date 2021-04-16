import * as React from "react";
import styled from "@emotion/styled";
import { Row } from "./styled";
import { Link } from "react-router-dom";
import { RequireRole } from "./require-role";
import { routes } from "../App";

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

export const Nav = () => (
  <StyledNav>
    <RequireRole role="admin">
      <StyledLink to={routes.users.path}>Users</StyledLink>
    </RequireRole>
    <RequireRole role="admin">
      <StyledLink to={routes.kudoses.path}>Kudoses</StyledLink>
    </RequireRole>
    <RequireRole role="user">
      <StyledLink to={routes.home.path}>Home</StyledLink>
    </RequireRole>
    <StyledLink to="/logout">Logout</StyledLink>
  </StyledNav>
);
