import React, { FC } from "react";
import { GET_TOKEN } from "./private-route";
import { useQuery } from "@apollo/react-hooks";
import * as jwt from "jsonwebtoken";

const jwtSecret = process.env.REACT_APP_JWT_SECRET || "";

interface RequireRoleProps {
  role: string;
  children: JSX.Element;
}

interface VerifiedToken {
  role: string;
}

export const RequireRole: FC<RequireRoleProps> = ({ role, children }) => {
  const { data } = useQuery(GET_TOKEN);
  const verifiedToken = jwtSecret
    ? (jwt.verify(data.token, jwtSecret) as VerifiedToken)
    : "";
  const isAllowed = verifiedToken && role === verifiedToken.role;

  return isAllowed ? <React.Fragment> {children}</React.Fragment> : null;
};
