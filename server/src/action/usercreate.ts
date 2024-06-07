import { Request, Response } from "express";
import { db } from "../database/db";

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

    // // todo -- generate jwt token
    // const tokenRes = await fetch(`${process.env.baseUrl}/auth/generatetoken`, {
    //   headers,
    //   method: "POST",
    //   body: JSON.stringify({ username: req.body.username }),
    // });

    res.status(201).json(fuser);
  } catch (err: any) {
    console.log("action/UserCreate :>> ", err);

    let code = err.code || 405;
    let msg = err.msg || { msg: "not found" };

    res.status(code).json(msg);
  }
}
