import { TestDto } from '../models/AnimalDto';
import { authFetch } from '../utils/fetch';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addTest = async (animalId: number, test: TestDto) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/test`, {
    method: 'POST',
    body: JSON.stringify(test),
  });
  if (!response.ok) throw new Error('Error añadiendo test');
  return response.json();
};

export const updateTest = async (animalId: number, test: TestDto) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/test/${test.id}`, {
    method: 'PUT',
    body: JSON.stringify(test),
  });
  if (!response.ok) throw new Error('Error actualizando test');
  return response.json();
};

export const deleteTest = async (animalId: number, testId: number) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/test/${testId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando test');
  return true;
};