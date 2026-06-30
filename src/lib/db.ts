import { PrismaClient } from "@/generated/prisma";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

// Reuse a single PrismaClient across hot reloads in development to avoid
// exhausting the database connection pool.
const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

/**
 * Builds the libSQL driver adapter. Works two ways:
 *  - Local dev / no Turso configured: DATABASE_URL="file:./dev.db" (or any
 *    libsql-compatible file/url), no auth token needed.
 *  - Production on Turso: set TURSO_DATABASE_URL ("libsql://...") and
 *    TURSO_AUTH_TOKEN, which take priority when present.
 */
function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  // Use Turso only when BOTH variables are present
  if (tursoUrl && tursoToken) {
    return new PrismaClient({
      adapter: new PrismaLibSQL({
        url: tursoUrl,
        authToken: tursoToken,
      }),
      log:
        process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  // Otherwise use local SQLite
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
