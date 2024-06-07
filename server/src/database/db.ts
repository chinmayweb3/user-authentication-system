import { UserFind } from "./login";
import { UserCreate } from "./usercreate";

class Database {
  UserCreate = UserCreate;
  UserFind = UserFind;
}

export const db = new Database();
