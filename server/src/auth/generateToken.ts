import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export default function (req: Request, res: Response) {
  const token = jwt.sign({ username: req.body.username }, "secret");
}
