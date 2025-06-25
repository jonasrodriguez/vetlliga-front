export enum EstadoAnimal {
  EN_PROTECTORA = '0',
  EN_ACOGIDA = '1',
  RESERVADO = '2',
  ADOPTADO = '3',
  FALLECIDO = '4',
}

export function getEstadoAnimalDescripcion(estado: EstadoAnimal): string {  
  switch (estado) {
    case EstadoAnimal.EN_PROTECTORA:
      return 'En protectora';
    case EstadoAnimal.EN_ACOGIDA:
      return 'En acogida';
    case EstadoAnimal.RESERVADO:
      return 'Reservado';
    case EstadoAnimal.ADOPTADO:
      return 'Adoptado';
    case EstadoAnimal.FALLECIDO:
      return 'Fallecido';
    default:
      return 'Desconocido';
  }
}

export const  getEstadoAnimalFromRoute = (routeParam: string): EstadoAnimal | null => {
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

export const mapEstado = (estado: string): string => {
  const estadoEnum = EstadoAnimal[estado as keyof typeof EstadoAnimal];
  if (!estadoEnum) {
    return 'Desconocido';
  }
  return getEstadoAnimalDescripcion(estadoEnum);
}