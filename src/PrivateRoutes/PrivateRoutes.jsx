import React, { use } from "react";
import { AuthContext } from "../Providers/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user } = use(AuthContext);
  if (!user) {
    return;
  }
  return <div>{children}</div>;
};

export default PrivateRoutes;
