import { Request, Response } from "express";
import { prismaError } from "../utils/prismaerror";
import { authorizationToken } from "../utils/jsonwebtoken";
import { prismadb } from "../utils/prisma";

export default async function (req: Request, res: Response) {
  const auth = req.headers.authorization?.split(" ");
  try {
    if (!auth) throw { code: 403, msg: "Token not Found" };
    const token = auth[1];

    const username = await authorizationToken(token);
    if (username.isError) throw { code: 401, msg: username.msg };

    const project = await prismadb.user.findFirst({
      where: { username: username.decode?.username },
      select: {
        id: true,
        username: true,
        project: true,
      },
    });
    res.status(200).json({ data: project });
  } catch (err: any) {
    console.log("action/userProjects :>> ", err);
    let code = err?.code || 405;
    let msg = err?.msg || "Not found";

    [code, msg] = prismaError(code, msg, err);

    res.status(code).json({ msg });
  }
}
