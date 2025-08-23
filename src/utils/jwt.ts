import { jwtDecode } from "jwt-decode";
import { Auth } from "../models/Auth";

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const parseJwt = (token: string): Auth => {
  const payload = jwtDecode<TokenPayload>(token);

  return {
    token,
    username: payload.sub,
    email: payload.email,
    role: payload.role,
    isAuthenticated: true,
  };
};