import { AnimalDto } from '../models/AnimalDto';
import { AnimalCriteria } from '../models/AnimalCriteria';
import { authFetch } from '../utils/fetch';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const fetchAnimal = async (id: number): Promise<AnimalDto> => {
  const response = await authFetch(`${API_BASE_URL}/animales/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch animal');
  }
  return response.json();
};

export const fetchAllAnimals = async (criteria: Partial<AnimalCriteria> = {}): Promise<AnimalDto[]> => {

  const queryParams = new URLSearchParams(
    Object.entries(criteria || {}).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await authFetch(`${API_BASE_URL}/animales${queryParams ? `?${queryParams}` : ''}`, 
    { method: 'GET',}
  );

  if (!response.ok) {
    throw new Error('Failed to fetch animals');
  }

  const animals: AnimalDto[] = await response.json();
  return animals;
};

export const createAnimal = async (newAnimal: Omit<AnimalDto, 'id'>): Promise<AnimalDto> => {
  const response = await authFetch(`${API_BASE_URL}/animales`, {
    method: 'POST',
    body: JSON.stringify(newAnimal),
  });
  if (!response.ok) {
    throw new Error('Failed to create animal');
  }
  return response.json();
};

export const updateAnimal = async (id: number, updates: Partial<AnimalDto>): Promise<AnimalDto> => {
  const response = await authFetch(`${API_BASE_URL}/animales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update animal');
  }
  return response.json();
};
