import React, { FC } from "react";
import { GET_TOKEN } from "./private-route";
import { useQuery } from "@apollo/react-hooks";
import * as jwt from "jsonwebtoken";

interface RequireRoleProps {
  role: string;
  children: JSX.Element;
}

interface DecodedToken {
  role: string;
}

export const RequireRole: FC<RequireRoleProps> = ({ role, children }) => {
  const { data } = useQuery(GET_TOKEN);
  const decodedToken = jwt.decode(data.token) as DecodedToken;
  const isAllowed = decodedToken && role === decodedToken.role;

  return isAllowed ? <React.Fragment> {children}</React.Fragment> : null;
};
