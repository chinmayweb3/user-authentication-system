import Call from "../utils/call";

type IAUthClient = {
  clientId: string;
};

class AuthClient {
  private readonly clientId: string;
  call: Call;
  constructor(props: IAUthClient) {
    this.clientId = props.clientId;
    this.call = new Call(props.clientId);
  }
}

export default AuthClient;
