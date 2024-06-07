import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prismadb } from "../utils/prisma";
import { Request, Response } from "express";

export type IUserCreate = {
  username: string;
  name: string;
  email: string;
  createAt: Date;
  id: string;
};

export default async function (req: Request, res: Response) {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const resp = await prismadb.user.create({
      data: {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      },
    });

    res.status(201).json({
      username: resp.username,
      name: resp.name,
      email: resp.email,
      id: resp.id,
      createAt: resp.createAt,
    });
  } catch (er: any) {
    let msg = "not found";
    let code = 405;

    if (er.code == "P2002") {
      code = 409;
      msg = "email already exist";
    }

    res.status(code).json({ msg });
  }
}
