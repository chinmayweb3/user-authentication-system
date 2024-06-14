import { randomBytes } from "crypto";

export default function generateClientSecretId(num: number = 16): string {
  return randomBytes(num).toString("hex");
}
