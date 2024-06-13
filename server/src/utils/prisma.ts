import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismadb = prisma;

export default prisma;
