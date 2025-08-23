import { authFetch, postMultipart } from '../utils/fetch';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export const addDocumento = async (animalId: number, file: File, descripcion: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("descripcion", descripcion);

  const response = await postMultipart(`${API_URL}/animales/${animalId}/file`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Error añadiendo documento");
  return response.json();
};


export const deleteDocumento = async (animalId: number, documentoId: number) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/file/${documentoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error eliminando documento');
  return true;
};

export const getDocumento = async (animalId: number, documentoId: number) => {
  const response = await authFetch(`${API_URL}/animales/${animalId}/file/${documentoId}`);
  if (!response.ok) throw new Error('Error obteniendo documento');
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  window.open(url, "_blank");
}