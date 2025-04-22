import { AnimalDto } from '../models/AnimalDto';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL

export const fetchAnimal = async (id: number): Promise<AnimalDto> => {
  const response = await fetch(`${API_BASE_URL}/animales/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch animal');
  }
  return response.json();
};

export const fetchAllAnimals = async (): Promise<AnimalDto[]> => {
  const response = await fetch(`${API_BASE_URL}/animales`);
  if (!response.ok) {
    throw new Error('Failed to fetch animals');
  }
  return response.json();
};

export const createAnimal = async (newAnimal: Omit<AnimalDto, 'id'>): Promise<AnimalDto> => {
  const response = await fetch(`${API_BASE_URL}/animales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnimal),
  });
  if (!response.ok) {
    throw new Error('Failed to create animal');
  }
  return response.json();
};

export const updateAnimal = async (id: number, updates: Partial<AnimalDto>): Promise<AnimalDto> => {
  const response = await fetch(`${API_BASE_URL}/animales/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update animal');
  }
  return response.json();
};