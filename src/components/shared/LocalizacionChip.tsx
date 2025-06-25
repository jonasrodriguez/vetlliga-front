import React from 'react';
import { Chip } from '@mui/material';
import { LocalizacionPerro, LocalizacionGato, getLocalizacionPerroDescripcion, getLocalizacionGatoDescripcion } from '../../enums/Localizacion';

interface LocalizacionChipProps {
  localizacion: string | null;
  tipo: string;
}

const getColorPerro = (localizacion: LocalizacionPerro | null): 'primary' | 'info' | 'default' => {
  switch (localizacion) {
    case LocalizacionPerro.NIVEL_1:
      return 'primary'; // Blue
    case LocalizacionPerro.NIVEL_2_3:
      return 'info'; // Light blue
    default:
      return 'default'; // Gray
  }
};

const getColorGato = (localizacion: LocalizacionGato | null): 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'default' => {
  switch (localizacion) {
    case LocalizacionGato.HOSPITALIZACION:
      return 'primary';      // Blue
    case LocalizacionGato.HOSPITALIZACION_CONSULTA:
      return 'info';         // Light blue
    case LocalizacionGato.CUARENTENA_ENTRADA:
      return 'warning';      // Orange
    case LocalizacionGato.CUARENTENA_SALIDA:
      return 'warning';      // Orange
    case LocalizacionGato.ADAPTACION:
      return 'success';      // Green
    case LocalizacionGato.CHIQUIPARK:
      return 'secondary';    // Purple
    case LocalizacionGato.PATIO_VERDE:
      return 'success';      // Green
    case LocalizacionGato.ZONA_LEUCEMIA:
      return 'error';        // Red
    case LocalizacionGato.ANTIGUA_ADAPTACION:
      return 'secondary';    // Purple
    case LocalizacionGato.COLONIA:
      return 'info';         // Light blue
    case LocalizacionGato.COLONIA_EXTERNA:
      return 'info';         // Light blue
    case LocalizacionGato.PROPIETARIO:
    default:
      return 'default';      // Gray
  }
};

const LocalizacionChip: React.FC<LocalizacionChipProps> = ({ localizacion, tipo }) => {
  if (localizacion === null || tipo === null) {
    return null;
  }

  const localizacionEnum = tipo === 'GATO' ? 
    LocalizacionGato[localizacion as keyof typeof LocalizacionGato] : 
    LocalizacionPerro[localizacion as keyof typeof LocalizacionPerro];

  const color = tipo === 'GATO' ? 
    getColorGato(localizacionEnum as LocalizacionGato) : 
    getColorPerro(localizacionEnum as LocalizacionPerro);
    
  const label = tipo === 'GATO' ?
    getLocalizacionGatoDescripcion(localizacionEnum as LocalizacionGato) :
    getLocalizacionPerroDescripcion(localizacionEnum as LocalizacionPerro);

  return (
    <Chip label={label}  color={color} />
  );
};

export default LocalizacionChip;