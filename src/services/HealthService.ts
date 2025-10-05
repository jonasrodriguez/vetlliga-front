import { Health } from '../models/Health';

export const fetchHealth = async (): Promise<Health> => {
  const response = await fetch('/api/actuator/health');
  if (!response.ok) {
    return { status: 'DOWN' };
  }
  return response.json();
};

export const fetchInfo = async (): Promise<Health> => {
  const response = await fetch('/api/actuator/info');
  if (!response.ok) {
    return { status: 'DOWN' };
  }
  return response.json();
};