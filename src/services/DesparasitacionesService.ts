import { DesparasitacionDto } from '../models/AnimalDto';
import { authFetch } from '../utils/fetch';

export const addDesparasitacion = async (animalId: number, desparasitacion: DesparasitacionDto) => {
  const response = await authFetch(`/api/animales/${animalId}/desparasitacion`, {
    method: 'POST',
    body: JSON.stringify(desparasitacion),
  });
  if (!response.ok) throw new Error('Error añadiendo desparasitación');
  return response.json();
};

export const updateDesparasitacion = async (animalId: number, desparasitacion: DesparasitacionDto) => {
  const response = await authFetch(`/api/animales/${animalId}/desparasitacion/${desparasitacion.id}`, {
    method: 'PUT',
    body: JSON.stringify(desparasitacion),
  });
  if (!response.ok) throw new Error('Error actualizando desparasitación');
  return response.json();
};

export const deleteDesparasitacion = async (animalId: number, desparasitacionId: number) => {
  const response = await authFetch(`/api/animales/${animalId}/desparasitacion/${desparasitacionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando desparasitación');
  return true;
};