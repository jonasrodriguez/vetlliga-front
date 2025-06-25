import { IntervencionDto } from '../models/AnimalDto';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addIntervencion = async (animalId: number, intervencion: IntervencionDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/intervencion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intervencion),
  });
  if (!response.ok) throw new Error('Error añadiendo intervención');
  return response.json();
};

export const updateIntervencion = async (animalId: number, intervencion: IntervencionDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/intervencion/${intervencion.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intervencion),
  });
  if (!response.ok) throw new Error('Error actualizando intervención');
  return response.json();
};

export const deleteIntervencion = async (animalId: number, intervencionId: number) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/intervencion/${intervencionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando intervención');
  return true;
};