import { DesparasitacionDto } from '../models/AnimalDto';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addDesparasitacion = async (animalId: number, desparasitacion: DesparasitacionDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/desparasitacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(desparasitacion),
  });
  if (!response.ok) throw new Error('Error añadiendo desparasitación');
  return response.json();
};

export const updateDesparasitacion = async (animalId: number, desparasitacion: DesparasitacionDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/desparasitacion/${desparasitacion.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(desparasitacion),
  });
  if (!response.ok) throw new Error('Error actualizando desparasitación');
  return response.json();
};

export const deleteDesparasitacion = async (animalId: number, desparasitacionId: number) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/desparasitacion/${desparasitacionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando desparasitación');
  return true;
};