import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma";



const globalForPrisma = globalThis;

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
