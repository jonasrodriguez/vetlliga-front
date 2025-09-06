import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnimalType } from '../enums/AnimalType';

import LocalizacionesConfig from '../components/config/LocalizacionesConfig';

const ConfigPage: React.FC = () => {

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Configuración
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <LocalizacionesConfig type={AnimalType.GATOS} />
        <LocalizacionesConfig type={AnimalType.PERROS} />
      </Box>
    </Box>
  );
};

export default ConfigPage;