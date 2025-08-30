import React from 'react';
import { Chip } from '@mui/material';
import { EstadoAnimal, getEstadoAnimalDescripcion } from '../../enums/EstadoAnimal';
import { ColorCodes } from '../../enums/ColorCodes';

interface EstadoChipProps {
  estado: string;
}

const getEstadoChipColor = (estado: EstadoAnimal | null): string => {
  switch (estado) {
    case EstadoAnimal.EN_PROTECTORA:
      return ColorCodes.Blue;
    case EstadoAnimal.EN_ACOGIDA:
      return ColorCodes.Teal;
    case EstadoAnimal.RESERVADO:
      return ColorCodes.Orange;
    case EstadoAnimal.ADOPTADO:
      return ColorCodes.Green;
    case EstadoAnimal.FALLECIDO:
      return ColorCodes.Red;
    case EstadoAnimal.PROPIETARIO:
      return ColorCodes.Brown;
    default:
      return ColorCodes.Grey;
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
      sx={{
        backgroundColor: getEstadoChipColor(estadoEnum),
        color: '#fff',
        fontWeight: 500,
      }}
    />
  );
};

export default EstadoChip;