import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prisma";
import { exclude } from "@/app/utils";
import { User as PrismaUser } from "@prisma/client";
import { User } from "@/app/zustand/authStore";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getMe(): Promise<User> {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const cleanRes = exclude<PrismaUser, "hashed_password">(user, [
      "hashed_password",
    ]);
    if (!cleanRes) return null;

    return {
      ...cleanRes,
      created_at: cleanRes.created_at.toISOString() || "",
      updated_at: cleanRes.created_at.toISOString() || "",
      emailVerified: cleanRes.emailVerified?.toISOString(),
    };
  } catch (error) {
    return null;
  }
}
