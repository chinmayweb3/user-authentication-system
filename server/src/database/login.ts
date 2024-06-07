import bcrypt from "bcrypt";
import { prismadb } from "../utils/prisma";
import { IisUser } from "./usercreate";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type IUserFindReq = {
  readonly password: string;
  readonly username: string;
};

export const UserFind = async (body: IUserFindReq): Promise<IisUser> => {
  try {
    const user = await prismadb.user.findFirst({
      where: { username: body.username },
    });
    if (!user) throw { code: 404, msg: "User not found" };

    const com = bcrypt.compare(body.password, user.password);
    if (!com) throw { code: 401, msg: "username/password is wrong" };

    return { isError: false, ...user };
  } catch (err: any) {
    console.log("db/login :>> ", err);

    let msg = err.message || "not Found";
    let code = 405;

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code == "P2002") (code = 409), (msg = "email already exist");
      if (err.code == "P2010")
        (code = 405), (msg = "database uri String not connected");
    }

    return { isError: true, code: 1100, msg: "sd" };
  }
};
