import { IntervencionDto } from '../models/AnimalDto';
import { authFetch } from '../utils/fetch';

export const addIntervencion = async (animalId: number, intervencion: IntervencionDto) => {
  const response = await authFetch(`/api/animales/${animalId}/intervencion`, {
    method: 'POST',
    body: JSON.stringify(intervencion),
  });
  if (!response.ok) throw new Error('Error añadiendo intervención');
  return response.json();
};

export const updateIntervencion = async (animalId: number, intervencion: IntervencionDto) => {
  const response = await authFetch(`/api/animales/${animalId}/intervencion/${intervencion.id}`, {
    method: 'PUT',
    body: JSON.stringify(intervencion),
  });
  if (!response.ok) throw new Error('Error actualizando intervención');
  return response.json();
};

export const deleteIntervencion = async (animalId: number, intervencionId: number) => {
  const response = await authFetch(`/api/animales/${animalId}/intervencion/${intervencionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando intervención');
  return true;
};