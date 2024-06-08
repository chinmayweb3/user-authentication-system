import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const prismaError = (
  code: number,
  msg: string,
  err: unknown
): [number, string] => {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code == "P2002") (code = 409), (msg = "Username already exist");
    if (err.code == "P2010") (code = 405), (msg = "database uri not connected");
  }

  return [code, msg];
};
