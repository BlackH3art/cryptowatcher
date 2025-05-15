import type { User } from "./User";

export interface SigninResponse {
  user: User;
  token: string;
};
