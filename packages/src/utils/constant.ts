import { SessionContext } from "../react/AuthProvider";

function isSessionContext() {
  if (!SessionContext) {
    throw new Error("SessionContext is not defined");
  }
}

const _baseUrl = "http://localhost:4000";

export { isSessionContext, _baseUrl };
