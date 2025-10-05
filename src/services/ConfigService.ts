import { Config } from '../models/Config';
import { Localizacion } from '../models/Localizacion';
import { authFetch } from '../utils/fetch';

export const fetchAppConfig = async (): Promise<Config> => {
  const response = await authFetch('/api/config');
  if (!response.ok) {
    return { localizaciones: [] };
  }
  return response.json();
};

export const addLocalizacion = async (nombre: string, tipo: 'GATO' | 'PERRO'): Promise<Localizacion> => {
  const response = await authFetch('/api/localizaciones', {
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
  const response = await authFetch(`/api/localizaciones/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la localización');
  }
};
