import { Request, Response } from "express";
import { IUserCreate } from "../db/usercreate";

export default async function (req: Request, res: Response) {
  try {
    const headers = { "Content-Type": "application/json" };
    //creating User
    const cUserRes = await fetch(`${process.env.baseUrl}/db/usercreate`, {
      headers,
      method: "POST",
      body: JSON.stringify(req.body),
    });
    const cUserJson = (await cUserRes.json()) as IUserCreate;
    if (cUserRes.status != 201) throw { code: cUserRes.status, msg: cUserJson };

    //user login confirmation
    const lUserRes = await fetch(`${process.env.baseUrl}/db/login`, {
      headers,
      method: "POST",
      body: JSON.stringify(req.body),
    });
    const lUserJson = await lUserRes.json();
    if (lUserRes.status != 200) throw { code: lUserRes.status, msg: lUserJson };

    // todo -- generate jwt token

    res.status(201).json(cUserJson);
  } catch (err: any) {
    let code = err.code;
    let msg = err.msg || { msg: "not found" };

    console.log("/db/UserCreate :", err);
    res.status(code || 405).json(msg);
  }
}
