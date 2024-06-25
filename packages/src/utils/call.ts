import { ISessionContextValue } from "../react/AuthProvider";

class Call {
  private readonly clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }
  async _getSession(): Promise<ISessionContextValue> {
    const token = localStorage.getItem("token");
    if (!token) {
    }
    return fetch("http://localhost:4000/o/getuser", {
      headers: {
        Authorization: "Bearer " + token,
        "x-client-id": "",
      },
      method: "GET",
    })
      .then(async (data) => {
        const user = await data.json();
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
