import { Response, Request } from "express";
import { db } from "../database/db";
import { generateToken } from "../utils/jsonwebtoken";

export default async function (req: Request, res: Response) {
  try {
    const { password, username } = req.body;
    const user = await db.UserFind({ password, username });
    if (user.isError) throw { code: user.code, msg: user.msg };

    const token = await generateToken({ username });
    if (!token) throw { code: 401, msg: "token expired" };

    res.status(200).json({ token });
  } catch (er: any) {
    console.log("action/userlogin :>> ", er);
    let code = er?.code || 405;
    let msg = er?.msg || "not found";

    res.status(code).json({ msg });
  }
}
