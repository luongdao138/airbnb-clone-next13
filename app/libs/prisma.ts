import { PrismaClient } from "@prisma/client";
import { __is_prod__ } from "@/app/constants";

declare global {
  var prisma: PrismaClient | undefined;
}

const client =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "error", "info", "warn"],
    errorFormat: __is_prod__ ? "minimal" : "pretty",
  });

if (!__is_prod__) globalThis.prisma = client;

export default client;
