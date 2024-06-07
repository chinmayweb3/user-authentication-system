import { Request, Response } from "express";
import { IUserCreate } from "../db/usercreate";

export default async function (req: Request, res: Response) {
  try {
    const headers = { "Content-Type": "application/json" };

    const cUserRes = await fetch(`${process.env.baseUrl}/db/usercreate`, {
      headers,
      method: "POST",
      body: JSON.stringify(req.body),
    });
    const cUserJson = (await cUserRes.json()) as IUserCreate;
    if (cUserRes.status !== 201)
      throw { code: cUserRes.status, msg: cUserJson };

    //todo -- user login confirmation
    const lUserRes = await fetch(`${process.env.baseUrl}/db/login`, {
      headers,
      method: "POST",
      body: JSON.stringify(req.body),
    });

    res.status(201).json(cUserJson);
  } catch (err: any) {
    let code = err.code;
    let msg = err.msg || "not found";

    res.status(code || 405).json(msg);
  }
}
