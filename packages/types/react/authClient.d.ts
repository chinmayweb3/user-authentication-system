import Call from "../utils/call";
type IAUthClient = {
    clientId: string;
};
declare class AuthClient {
    private readonly clientId;
    call: Call;
    constructor(props: IAUthClient);
}
export default AuthClient;
