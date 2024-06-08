import jwt from "jsonwebtoken";

export const generateToken = async (body: { username: string }) => {
  const sign = { username: body.username };
  const token = jwt.sign(sign, "secret");
  return token;
};

export const authorizationToken = async (token: string) => {
  try {
    const decode = jwt.decode(token) as { username: string };
    if (!decode) throw "";
    return { isError: false, decode };
  } catch (err: any) {
    return { isError: true, msg: "token not match" };
  }
};
