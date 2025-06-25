import { HistorialDto } from '../models/AnimalDto';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addHistorial = async (animalId: number, historial: HistorialDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/historial`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(historial),
  });
  if (!response.ok) throw new Error('Error añadiendo historial');
  return response.json();
};

export const updateHistorial = async (animalId: number, historial: HistorialDto) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/historial/${historial.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(historial),
  });
  if (!response.ok) throw new Error('Error actualizando historial');
  return response.json();
};

export const deleteHistorial = async (animalId: number, historialId: number) => {
  const response = await fetch(`${API_URL}/animales/${animalId}/historial/${historialId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando historial');
  return true;
};