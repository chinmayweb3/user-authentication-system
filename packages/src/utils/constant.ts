import { SessionContext } from "../react/AuthProvider";

function isSessionContext() {
  if (!SessionContext) {
    throw new Error("SessionContext is not defined");
  }
}

export { isSessionContext };
