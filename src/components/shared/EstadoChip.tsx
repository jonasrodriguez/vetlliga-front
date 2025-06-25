import React from 'react';
import { Chip } from '@mui/material';
import { EstadoAnimal, getEstadoAnimalDescripcion } from '../../enums/EstadoAnimal';

interface EstadoChipProps {
  estado: string;
}

const getEstadoChipColor = (estado: EstadoAnimal | null): 'primary' | 'info' | 'warning' | 'success' | 'error' | 'default' => {
  switch (estado) {
    case EstadoAnimal.EN_PROTECTORA:
      return 'primary'; // Blue
    case EstadoAnimal.EN_ACOGIDA:
      return 'info'; // Light blue
    case EstadoAnimal.RESERVADO:
      return 'warning'; // Yellow
    case EstadoAnimal.ADOPTADO:
      return 'success'; // Green
    case EstadoAnimal.FALLECIDO:
      return 'error'; // Red
    default:
      return 'default'; // Gray
  }
};

const EstadoChip: React.FC<EstadoChipProps> = ({ estado }) => {
  if (estado === null) {
    return null; // Don't render anything if estado is null
  }
  const estadoEnum = EstadoAnimal[estado as keyof typeof EstadoAnimal];
  
  return (
    <Chip
      label={getEstadoAnimalDescripcion(estadoEnum)}
      color={getEstadoChipColor(estadoEnum)}
    />
  );
};

export default EstadoChip;