import React from "react";

type IAuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = (props: IAuthProviderProps) => {
  return <>{props.children}</>;
};

export { AuthProvider };
