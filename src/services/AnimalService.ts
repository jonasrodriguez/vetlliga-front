import { AnimalDto, AnimalPages } from '../models/AnimalDto';
import { AnimalCriteria } from '../models/AnimalCriteria';
import { authFetch } from '../utils/fetch';

export const fetchAnimal = async (id: number): Promise<AnimalDto> => {
  const response = await authFetch(`/api/animales/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch animal');
  }
  return response.json();
};

export const fetchAllAnimals = async (criteria: Partial<AnimalCriteria> = {}): Promise<AnimalPages> => {

  const queryParams = new URLSearchParams(
    Object.entries(criteria || {}).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await authFetch(`/api/animales${queryParams ? `?${queryParams}` : ''}`, 
    { method: 'GET',}
  );

  if (!response.ok) {
    throw new Error('Failed to fetch animals');
  }

  return await response.json();
};

export const createAnimal = async (newAnimal: Omit<AnimalDto, 'id'>): Promise<AnimalDto> => {
  const response = await authFetch(`/api/animales`, {
    method: 'POST',
    body: JSON.stringify(newAnimal),
  });
  if (!response.ok) {
    throw new Error('Failed to create animal');
  }
  return response.json();
};

export const updateAnimal = async (id: number, updates: Partial<AnimalDto>): Promise<AnimalDto> => {
  const response = await authFetch(`/api/animales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update animal');
  }
  return response.json();
};

export const disableAnimal = async (id: number): Promise<void> => {
  const response = await authFetch(`/api/animales/${id}/active?active=false`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to delete animal');
  }
};
