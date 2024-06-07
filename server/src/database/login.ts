import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { prismadb } from "../utils/prisma";
import { IisUser } from "./usercreate";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// export default async function (req: Request, res: Response) {
//   try {
//     const user = await prismadb.user.findFirst({
//       where: { email: req.body.email },
//     });
//     if (!user || !user.password) throw { code: 404, msg: "User not found" };

//     const com = bcrypt.compare(req.body.password, user.password);
//     if (!com) throw { code: 401, msg: "username/password is wrong" };

//     res.status(200).json(user);
//   } catch (err: any) {
//     let code = err.code || 405;
//     let msg = err.msg || "not found";

//     console.log("error db/login :", err);
//     res.status(code).json({ msg });
//   }
// }

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
