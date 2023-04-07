import { client } from "./client";

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export const register = (data: RegisterInput) => {
  return client.post("/register", data);
};
