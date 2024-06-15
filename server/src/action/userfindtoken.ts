import { Request, Response } from "express";
import { authorizationToken } from "../utils/jsonwebtoken";
import { prismadb } from "../utils/prisma";
import { prismaError } from "../utils/prismaerror";

export default async function (req: Request, res: Response) {
  const auth = req.headers.authorization?.split(" ");
  try {
    if (!auth) throw { code: 403, msg: "Token not Found" };
    const token = auth[1];

    const username = await authorizationToken(token);
    if (username.isError) throw { code: 401, msg: username.msg };

    const user = await prismadb.user.findFirst({
      where: { username: username.decode?.username },
    });
    if (!user) throw { code: 404, msg: "User not Found" };
    res.status(200).json(user);
  } catch (err: any) {
    console.log("action/userfind :>> ", err);
    let code = err?.code || 405;
    let msg = err?.msg || "Not found";

    [code, msg] = prismaError(code, msg, err);

    res.status(code).json({ msg });
  }
}
