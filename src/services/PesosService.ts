import { PesoDto } from '../models/AnimalDto';
import { authFetch } from '../utils/fetch';

export const addPeso = async (animalId: number, peso: PesoDto) => {
  const response = await authFetch(`/api/animales/${animalId}/peso`, {
    method: 'POST',
    body: JSON.stringify(peso),
  });
  if (!response.ok) throw new Error('Error añadiendo peso');
  return response.json();
};

export const updatePeso = async (animalId: number, peso: PesoDto) => {
  const response = await authFetch(`/api/animales/${animalId}/peso/${peso.id}`, {
    method: 'PUT',
    body: JSON.stringify(peso),
  });
  if (!response.ok) throw new Error('Error actualizando peso');
  return response.json();
};

export const deletePeso = async (animalId: number, pesoId: number) => {
  const response = await authFetch(`/api/animales/${animalId}/peso/${pesoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando peso');
  return true;
};