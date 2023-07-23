import jwt from 'jsonwebtoken';

export const parseJwt = (
  token: string
): {
  scp: string;
} => jwt.decode(token) as any;
