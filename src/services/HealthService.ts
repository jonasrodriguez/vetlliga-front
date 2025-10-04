import { Health } from '../models/Health';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchHealth = async (): Promise<Health> => {
  const response = await fetch(`${API_URL}/actuator/health`);
  if (!response.ok) {
    return { status: 'DOWN' };
  }
  return response.json();
};

export const fetchInfo = async (): Promise<Health> => {
  const response = await fetch(`${API_URL}/actuator/info`);
  if (!response.ok) {
    return { status: 'DOWN' };
  }
  return response.json();
};