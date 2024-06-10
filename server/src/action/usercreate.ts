import { Request, Response } from "express";
import { db } from "../database/db";
import { generateToken } from "../utils/jsonwebtoken";

export default async function (req: Request, res: Response) {
  try {
    const headers = { "Content-Type": "application/json" };
    let { email, password, name, username } = req.body;
    username = username.trim();

    //creating User
    const user = await db.UserCreate({ email, password, name, username });
    if (user.isError) throw { code: user.code, msg: user.msg };

    //user login confirmation
    const fuser = await db.UserFind({ username, password });
    if (fuser.isError) throw { code: fuser.code, msg: fuser.msg };

    //generate jwt token
    const token = await generateToken({ username });

    res.status(201).json({ token });
  } catch (err: any) {
    console.log("action/UserCreate :>> ", err);

    let code = err?.code || 405;
    let msg = err?.msg || "not found";

    res.status(code).json({ msg });
  }
}
