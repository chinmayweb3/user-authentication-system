import { useContext } from "react";
import { SessionContext } from "./AuthProvider";
import { isSessionContext } from "../utils/constant";

const AuthLogin = () => {
  isSessionContext();
  const sessionValue = useContext(SessionContext);

  return 0;
};

export default AuthLogin;
