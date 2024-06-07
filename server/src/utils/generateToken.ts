import jwt from "jsonwebtoken";

export const generateToken = async (body: { username: string }) => {
  const token = jwt.sign({ username: body.username }, "secret");
  return token;
};
