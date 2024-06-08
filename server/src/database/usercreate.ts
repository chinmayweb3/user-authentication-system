import bcrypt from "bcrypt";
import { prismadb } from "../utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type IUser = {
  username: string;
  name: string;
  email: string;
  readonly password: string;
  createAt: Date;
  id: string;
};

export type IisUser =
  | (IUser & { isError: false })
  | {
      isError: true;
      msg: string;
      code: Number;
    };

type IUserCreateReq = {
  password: string;
  username: string;
  email: string;
  name: string;
};
export const UserCreate = async (body: IUserCreateReq): Promise<IisUser> => {
  try {
    const hash = await bcrypt.hash(body.password, 10);

    const resp = await prismadb.user.create({
      data: {
        username: body.username,
        name: body.name,
        email: body.email,
        password: hash,
      },
    });
    return { isError: false, ...resp };
  } catch (err: any) {
    console.log("db/Usercreate :>> ", err);

    let msg = err.message || "not Found";
    let code = 405;

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code == "P2002") (code = 409), (msg = "Username already exist");
      if (err.code == "P2010")
        (code = 405), (msg = "database uri not connected");
    }

    return { isError: true, code, msg };
  }
};
