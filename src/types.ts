import { user } from '@prisma/db';

export interface JwtPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
}

export type AuthUser = Partial<user>;

export interface TaskContent {
  [key: string]: any;
  url: string;
}
