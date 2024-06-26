import { ISessionContextValue } from "../react/AuthProvider";
import { _baseUrl } from "./constant";

class Call {
  private readonly clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }
  async _getSession(): Promise<ISessionContextValue> {
    const token = localStorage.getItem("token");

    return fetch(`${_baseUrl}/o/getuser`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(async (data) => {
        const user = await data.json();
        if (!user) throw new Error("user not found");
        return { data: user, status: "authenticated" } as ISessionContextValue;
      })
      .catch(() => {
        return {
          data: null,
          status: "unauthenticated",
        } as ISessionContextValue;
      });
  }
}

export default Call;
