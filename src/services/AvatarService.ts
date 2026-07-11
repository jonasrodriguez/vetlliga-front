import { authFetch, postMultipart } from '@/utils/fetch';

export const uploadAvatar = async (animalId: number, avatar: Blob) => {
  const formData = new FormData();
  formData.append('file', avatar, 'avatar.png');

  const response = await postMultipart(`/api/animales/${animalId}/avatar`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Error añadiendo avatar");
};

export const getAvatar = async (animalId: number, isGato: boolean) => {

  const imageNum = animalId % 5;
  const defaultAvatar = isGato 
    ? `/avatars/gato${imageNum}.png` 
    : `/avatars/perro${imageNum}.png`;

  try {
    const response = await authFetch(`/api/animales/${animalId}/avatar`);
    
    if (!response.ok) {
      return defaultAvatar;
    }

    const blob = await response.blob();

    // "null or empty" -> 0 bytes
    if (!blob || blob.size === 0) {
      return defaultAvatar;
    }

    return window.URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error obteniendo avatar', error);
    return defaultAvatar;
  }  
}
