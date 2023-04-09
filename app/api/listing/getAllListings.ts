import prisma from "@/app/libs/prisma";
import { ListingRes } from "@/app/services/rent";

export default async function getListings(): Promise<ListingRes[]> {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
