import React from "react";
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
export type ISessionContextValue = {
    auth: AuthClient;
    status: "authenticated";
    data: IUser;
} | {
    auth: AuthClient;
    status: "unauthenticated";
    data: null;
};
export declare const SessionContext: React.Context<ISessionContextValue | undefined>;
declare const AuthProvider: (props: IAuthProviderProps) => import("react/jsx-runtime").JSX.Element;
export { AuthProvider };
