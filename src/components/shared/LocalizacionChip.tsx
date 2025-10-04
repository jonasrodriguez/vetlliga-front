import React from 'react';
import { Chip } from '@mui/material';
import { ColorCodes } from '../../enums/ColorCodes';

import useConfigStore from '../../stores/ConfigStore';

interface LocalizacionChipProps {
  localizacion: number;
}

const LocalizacionChip: React.FC<LocalizacionChipProps> = ({ localizacion }) => {

  const { config, localizacionesGato, localizacionesPerro } = useConfigStore();

  const colorValues = Object.values(ColorCodes);
  const loc = config?.localizaciones.find(l => l.id === localizacion);
  const locIndex = loc?.tipo === 'GATO' ? localizacionesGato.findIndex((l) => l.value === localizacion) 
    : localizacionesPerro.findIndex((l) => l.value === localizacion);
    
  const color = colorValues[locIndex % colorValues.length];

  return (
    <Chip
      label={loc?.nombre}
      sx={{
        backgroundColor: color,
        color: '#fff',
        fontWeight: 500,
      }}
    />
  );
};

export default LocalizacionChip;