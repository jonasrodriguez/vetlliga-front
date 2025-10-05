import { HistorialDto } from '../models/AnimalDto';
import { authFetch } from '../utils/fetch';

export const addHistorial = async (animalId: number, historial: HistorialDto) => {
  const response = await authFetch(`/api/animales/${animalId}/historial`, {
    method: 'POST',
    body: JSON.stringify(historial),
  });
  if (!response.ok) throw new Error('Error añadiendo historial');
  return response.json();
};

export const updateHistorial = async (animalId: number, historial: HistorialDto) => {
  const response = await authFetch(`/api/animales/${animalId}/historial/${historial.id}`, {
    method: 'PUT',
    body: JSON.stringify(historial),
  });
  if (!response.ok) throw new Error('Error actualizando historial');
  return response.json();
};

export const deleteHistorial = async (animalId: number, historialId: number) => {
  const response = await authFetch(`/api/animales/${animalId}/historial/${historialId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando historial');
  return true;
};