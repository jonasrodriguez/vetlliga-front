import { Config } from '../models/Config';
import { authFetch } from '../utils/fetch';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAppConfig = async (): Promise<Config> => {
  const response = await authFetch(`${API_URL}/api/config`);
  if (!response.ok) {
    return { localizaciones: [] };
  }
  return response.json();
};
