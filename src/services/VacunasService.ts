import { VacunacionDto } from '../models/AnimalDto';
import { authFetch } from '../utils/fetch';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addVacuna = async (animalId: number, vacuna: VacunacionDto) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/vacunacion`, {
    method: 'POST',
    body: JSON.stringify(vacuna),
  });
  if (!response.ok) throw new Error('Error añadiendo vacuna');
  return response.json();
};

export const updateVacuna = async (animalId: number, vacuna: VacunacionDto) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/vacunacion/${vacuna.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vacuna),
  });
  return response.json();
};

export const deleteVacuna = async (animalId: number, vacunaId: number) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/vacunacion/${vacunaId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando vacuna');
  return true;
};