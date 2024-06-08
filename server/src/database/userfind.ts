import bcrypt from "bcrypt";
import { prismadb } from "../utils/prisma";
import { IisUser } from "./usercreate";
import { prismaError } from "../utils/prismaerror";

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

    const com = await bcrypt.compare(body.password, user.password);
    if (!com) throw { code: 401, msg: "username/password is wrong" };

    return { isError: false, ...user };
  } catch (err: any) {
    console.log("db/login :>> ", err);

    let msg = err?.msg || "not Found";
    let code = err?.code || 405;

    [code, msg] = prismaError(code, msg, err);

    return { isError: true, code, msg };
  }
};
