export enum SexoAnimal {
  MACHO = 'MACHO',
  HEMBRA = 'HEMBRA',
  DESCONOCIDO = 'DESCONOCIDO',
}

export const sexoLiterales = (sexo: string): string => {
  switch (sexo) {
    case 'MACHO':
      return 'Macho';
    case 'HEMBRA':
      return 'Hembra';
    default:
      return 'Desconocido';
  }
}