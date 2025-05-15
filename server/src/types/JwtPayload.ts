import { Request } from "express";

export interface JwtPayload {
  user: {
    id: number;
    username: string;
  };
};

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload['user'];
};
