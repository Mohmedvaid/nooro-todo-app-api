import { PrismaClient } from "@prisma/client";

/**
 * Singleton instance of the Prisma client.
 */
export const prisma = new PrismaClient();
