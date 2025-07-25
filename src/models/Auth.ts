export interface Auth {
  token: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

export const initialAuth: Auth = {
  token: null,
  username: null,
  email: null,
  role: null,
  isAuthenticated: false,
};