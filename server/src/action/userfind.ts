import { Request, Response } from "express";
import { authorizationToken } from "../utils/jsonwebtoken";
import { db } from "../database/db";
import { prismadb } from "../utils/prisma";

export default async function (req: Request, res: Response) {
  const auth = req.headers.authorization?.split(" ");
  try {
    console.log("userfind starting", auth, req.headers);

    if (!auth) throw { code: 403, msg: "Token not Found" };
    const token = auth[1];

    const username = await authorizationToken(token);

    const user = await prismadb.user.findFirst({
      where: { email: username.decode?.username },
    });
    console.log("user ::::>>>>", user);
    res.status(200).json(user);
  } catch (err: any) {
    console.log("action/userfind :>> ", err);
    let code = err?.code || 405;
    let msg = err?.msg || "Not found";

    res.status(code).json({ msg });
  }
}
