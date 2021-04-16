import React, { FC } from "react";
import * as jwt from "jsonwebtoken";

interface RequireRoleProps {
  role: string;
  children: JSX.Element;
}

interface DecodedToken {
  role: string;
}

export const RequireRole: FC<RequireRoleProps> = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token || "") as DecodedToken;
  const isAllowed = decodedToken && role === decodedToken.role;

  return isAllowed ? <React.Fragment> {children}</React.Fragment> : null;
};
