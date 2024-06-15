import { Request, Response } from "express";
import { prismadb } from "../utils/prisma";
import { prismaError } from "../utils/prismaerror";
import { authorizationToken } from "../utils/jsonwebtoken";
import generateClientSecretId from "../utils/createClientSecret";

export default async function (req: Request, res: Response) {
  const auth = req.headers.authorization?.split(" ");
  let { pname, wname } = req.body as { pname: string; wname: string };
  try {
    if (!auth) throw { code: 403, msg: "Token not Found" };
    const token = auth[1];

    if (
      pname.startsWith(" ") ||
      pname.endsWith(" ") ||
      wname.startsWith(" ") ||
      wname.endsWith(" ")
    ) {
      throw { code: 101, msg: "no space allowed" };
    }

    // add slug to project name replace space with -
    pname = pname.replaceAll(" ", "-");

    const username = await authorizationToken(token);
    if (username.isError) throw { code: 401, msg: username.msg };

    //check if the project name has been used by the same username before (with prismadb)
    const user = await prismadb.user.findFirst({
      where: { username: username.decode?.username },
      select: { id: true, username: true, project: true },
    });
    // if so throw an error on the screen
    if (!user) throw { code: 404, msg: "user not found" };
    if (user.project.some((i) => i.projectName == pname))
      throw { code: 403, msg: "project name exists" };

    //generate an random client id and secret id for the developer
    const clientId = generateClientSecretId(16);
    const secretId = generateClientSecretId(32);

    //store the projectname,websitename,clientid,secretid,userid, into the db
    const createProject = await prismadb.project.create({
      data: {
        clientId,
        secretId,
        projectName: pname,
        websiteName: wname,
        userId: user.id,
      },
    });

    res.status(201).json({ data: createProject });
  } catch (err: any) {
    console.log("action/userProjects :>> ", err);
    let code = err?.code || 405;
    let msg = err?.msg || "Not found";

    [code, msg] = prismaError(code, msg, err);

    res.status(code).json({ msg });
  }
}
