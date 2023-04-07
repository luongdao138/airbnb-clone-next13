import { RegisterInput } from "@/app/services/auth";
import authUtil from "@/app/utils/auth";
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: RegisterInput = await req.json();

  const { email, password, username } = body;

  // check if email already exists
  const isExist = await prisma.user.findUnique({ where: { email } });
  if (isExist) {
    return NextResponse.json({ msg: "Email already taken!" }, { status: 400 });
  }

  const hashedPwd = await authUtil.hashPwd(password);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      hashed_password: hashedPwd,
    },
  });

  return NextResponse.json(user);
}
