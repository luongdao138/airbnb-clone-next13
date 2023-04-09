import { client } from "./client";

export interface CreateListingReq {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  room_cnt: number;
  bathroom_cnt: number;
  guest_cnt: number;
  location_value: string;
  price: number;
}

export interface ListingUserRes {
  id: string;
  name: string | null;
}

export interface ListingRes {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  room_cnt: number;
  bathroom_cnt: number;
  guest_cnt: number;
  location_value: string;
  price: number;
  created_at: Date;
  updated_at: Date;

  // relation fields
  user_id: string;
  user: ListingUserRes;
}

// create listing
export const createListing = (data: CreateListingReq) => {
  return client.post("/listing", data);
};
