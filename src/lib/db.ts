import { PrismaClient } from "@/generated/prisma";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

type GlobalForPrisma = typeof globalThis & { prisma?: PrismaClient };

// Reuse a single PrismaClient across hot reloads in development to avoid
// exhausting the database connection pool.
const globalForPrisma = globalThis as GlobalForPrisma;

/**
 * Builds the libSQL driver adapter. Works two ways:
 *  - Local dev / no Turso configured: DATABASE_URL="file:./dev.db" (or any
 *    libsql-compatible file/url), no auth token needed.
 *  - Production on Turso: set TURSO_DATABASE_URL ("libsql://...") and
 *    TURSO_AUTH_TOKEN, which take priority when present.
 */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaLibSQL({
      url: process.env.DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
