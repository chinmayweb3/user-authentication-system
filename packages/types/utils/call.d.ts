import { ISessionContextValue } from "../react/AuthProvider";
declare class Call {
    private readonly clientId;
    constructor(clientId: string);
    _getSession(): Promise<ISessionContextValue>;
}
export default Call;
