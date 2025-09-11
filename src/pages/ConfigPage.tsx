import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { AnimalType } from '../enums/AnimalType';

import LocalizacionesConfig from '../components/config/LocalizacionesConfig';
import UsuariosConfig from '../components/config/UsuariosConfig';

const ConfigPage: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>();

  const localizaciones = (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <LocalizacionesConfig type={AnimalType.GATOS} />
      <LocalizacionesConfig type={AnimalType.PERROS} />
    </Box>    
  );

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Configuración
      </Typography>
      {tipo === 'usuarios' ? (
        <UsuariosConfig />
      ) : tipo === 'localizaciones' ? (
        localizaciones
      ) : null}
    </Box>
  );
};

export default ConfigPage;