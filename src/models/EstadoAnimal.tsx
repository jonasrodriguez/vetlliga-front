export enum EstadoAnimal {
  EN_PROTECTORA = 0,
  EN_ACOGIDA = 1,
  RESERVADO = 2,
  ADOPTADO = 3,
  FALLECIDO = 4,
}

export const EstadoAnimalDescriptions: Record<EstadoAnimal, string> = {
  [EstadoAnimal.EN_PROTECTORA]: 'En protectora',
  [EstadoAnimal.EN_ACOGIDA]: 'En acogida',
  [EstadoAnimal.RESERVADO]: 'Reservado',
  [EstadoAnimal.ADOPTADO]: 'Adoptado',
  [EstadoAnimal.FALLECIDO]: 'Fallecido',
};

export const getEstadoAnimalFromRoute = (routeParam: string): EstadoAnimal | null => {
  switch (routeParam.toLowerCase()) {
    case 'en-protectora':
      return EstadoAnimal.EN_PROTECTORA;
    case 'en-acogida':
      return EstadoAnimal.EN_ACOGIDA;
    case 'reservados':
      return EstadoAnimal.RESERVADO;
    case 'adoptados':
      return EstadoAnimal.ADOPTADO;
    case 'fallecidos':
      return EstadoAnimal.FALLECIDO;
    default:
      return null;
  }
};