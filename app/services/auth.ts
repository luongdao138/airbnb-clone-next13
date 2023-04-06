import { client } from "./client";

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export const register = (data: RegisterInput) => {
  return client.post("/register", data);
};
