import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { db } from "../utils/prisma";
export default async function (req: Request, res: Response) {
  try {
    const user = await db.user.findFirst({
      where: { email: req.body.email },
    });
    if (!user || !user.password) throw { code: 404, msg: "User not found" };

    const com = bcrypt.compare(req.body.password, user.password);
    if (!com) throw { code: 401, msg: "username/password is wrong" };

    res.status(200).json(user);
  } catch (err: any) {
    let code = err.code || 405;
    let msg = err.msg || "not found";

    console.log("error db/login :", err);
    res.status(code).json({ msg });
  }
}
