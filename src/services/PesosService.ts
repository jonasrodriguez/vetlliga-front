import { PesoDto } from '../models/AnimalDto';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addPeso = async (animalId: number, peso: PesoDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/peso`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(peso),
  });
  if (!response.ok) throw new Error('Error añadiendo peso');
  return response.json();
};

export const updatePeso = async (animalId: number, peso: PesoDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/peso/${peso.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(peso),
  });
  if (!response.ok) throw new Error('Error actualizando peso');
  return response.json();
};

export const deletePeso = async (animalId: number, pesoId: number) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/peso/${pesoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando peso');
  return true;
};