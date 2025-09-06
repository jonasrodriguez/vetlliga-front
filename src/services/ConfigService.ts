import { Config } from '../models/Config';
import { Localizacion } from '../models/Localizacion';
import { authFetch } from '../utils/fetch';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAppConfig = async (): Promise<Config> => {
  const response = await authFetch(`${API_URL}/api/config`);
  if (!response.ok) {
    return { localizaciones: [] };
  }
  return response.json();
};

export const addLocalizacion = async (nombre: string, tipo: 'GATO' | 'PERRO'): Promise<Localizacion> => {
  const response = await authFetch(`${API_URL}/api/localizaciones`, {
    method: 'POST',
    body: JSON.stringify({ nombre, tipo }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al añadir la localización');
  }
  return response.json();
};

export const deleteLocalizacion = async (id: number): Promise<void> => {
  const response = await authFetch(`${API_URL}/api/localizaciones/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la localización');
  }
};
