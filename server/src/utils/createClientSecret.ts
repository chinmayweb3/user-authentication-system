import crypto from "crypto";

export default function generateClientSecretId(num: number = 16): string {
  return crypto.randomBytes(num).toString("hex");
}
