import jwt from "jsonwebtoken";

export const generateToken = async (body: { username: string }) => {
  const sign = { username: body.username };
  const token = jwt.sign(sign, "secret");
  return token;
};
