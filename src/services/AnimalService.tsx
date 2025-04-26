import { AnimalDto } from '../models/AnimalDto';
import { EstadoAnimal, EstadoAnimalDescriptions } from '../models/EstadoAnimal';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL

export const fetchAnimal = async (id: number): Promise<AnimalDto> => {
  const response = await fetch(`${API_BASE_URL}/animales/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch animal');
  }
  return response.json();
};

export const fetchAllAnimals = async (criteria?: { tipo?: string; estado?: number }): Promise<AnimalDto[]> => {
  const queryParams = new URLSearchParams(
    Object.entries(criteria || {}).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await fetch(`${API_BASE_URL}/animales${queryParams ? `?${queryParams}` : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch animals');
  }

  const animals: AnimalDto[] = await response.json();
  return animals.map((animal) => mapAnimal(animal));
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

const mapAnimal = (animal: AnimalDto): AnimalDto => {
  return {
    ...animal,
    estadoDescripcion: mapEstadoToDescription(animal.estado),
    edad: mapEdad(animal.fechaNacimiento),
    sexoDescripcion: mapSexo(animal.sexo),
  };
}

const mapSexo = (sexo: string): string => {
  switch (sexo) {
    case 'M':
      return 'Macho';
    case 'H':
      return 'Hembra';
    default:
      return 'Desconocido';
  }
}

const mapEstadoToDescription = (estado: EstadoAnimal): string => {
  return EstadoAnimalDescriptions[estado] || 'Desconocido';
};

const mapEdad = (fechaNacimiento: string | null | undefined): string => {
  if (!fechaNacimiento) {
    return 'Desconocido';
  }

  const birthDate = new Date(fechaNacimiento);
  if (isNaN(birthDate.getTime())) {
    return 'Desconocido';
  }

  const today = new Date();
  const diffInMilliseconds = today.getTime() - birthDate.getTime();
  const diffInMonths = diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears >= 1) {
    return diffInYears === 1 ? '1 año' : `${diffInYears} años`;
  } else if (diffInMonths >= 1) {
    const roundedMonths = Math.floor(diffInMonths);
    return roundedMonths === 1 ? '1 mes' : `${roundedMonths} meses`;
  } else {
    return '< 1 mes';
  }
};