import React, { useContext } from "react";
import call from "../utils/call";
import AuthClient from "./authClient";

type IAuthProviderProps = {
  children: React.ReactNode;
  auth: AuthClient;
};

type IUser = {
  id: string;
  name: string;
  username: string;
};

export type ISessionContextValue =
  | {
      auth: AuthClient;
      status: "authenticated";
      data: IUser;
    }
  | {
      auth: AuthClient;
      status: "unauthenticated";
      data: null;
    };

export const SessionContext = React?.createContext?.<
  ISessionContextValue | undefined
>(undefined);

const AuthProvider = (props: IAuthProviderProps) => {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in server components");
  }

  const [session, setSession] = React.useState<ISessionContextValue>({
    auth: props.auth,
    status: "unauthenticated",
    data: null,
  });

  React.useEffect(() => {
    // Initialize session
    // todo call get method to server to check
    props.auth.call._getSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { AuthProvider };
