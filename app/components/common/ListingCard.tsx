"use client";

import { ListingRes } from "@/app/services/rent";
import { useCountries } from "@/app/utils/hooks/useCountries";
import { User } from "@/app/zustand/authStore";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ListingCardProps {
  data: ListingRes;
  currentUser: User | null;
}

const ListingCard: FC<ListingCardProps> = ({ currentUser, data }) => {
  const router = useRouter();
  const { findCountryByCca } = useCountries();

  const location = findCountryByCca(data.location_value);

  return <div>ListingCard</div>;
};

export default ListingCard;
