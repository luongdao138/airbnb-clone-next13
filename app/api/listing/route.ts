import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import getMe from "@/app/api/user/me";
import { CreateListingReq } from "@/app/services/rent";

export async function POST(req: NextRequest) {
  const user = await getMe();

  if (!user) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const body: CreateListingReq = await req.json();

  const listing = await prisma.listing.create({
    data: { ...body, user_id: user.id },
  });
  return NextResponse.json(listing);
}
