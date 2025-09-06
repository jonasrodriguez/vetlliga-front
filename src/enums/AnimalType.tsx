export enum AnimalType {
  GATOS = 'G',
  PERROS = 'P',
}

export const getAnimalType = (type: AnimalType): 'GATO' | 'PERRO' => {
  return type === AnimalType.GATOS ? 'GATO' : 'PERRO';
};

export const getAnimalTypeLabel = (type: AnimalType): string => {
  return type === AnimalType.GATOS ? 'Gatos' : 'Perros';
}