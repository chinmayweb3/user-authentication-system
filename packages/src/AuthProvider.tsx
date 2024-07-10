import React, { FC } from "react";

const AuthContext = React.createContext(null);

type IAuthProvider = {
  children: React.ReactNode;
  clientId: string;
};

const AuthProvider = (props: IAuthProvider) => {
  const [loading, setLoading] = React.useState<Boolean>(false);
  let value = null;

  React.useEffect(() => {
    value = {
      loading,
    };
  }, [loading]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
