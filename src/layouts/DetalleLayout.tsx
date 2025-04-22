import { Box } from '@mui/material';
import { AnimalDto } from '../models/AnimalDto';

import PersonalInfo from '../components/details/PersonalInfo';
import Pesos from '../components/details/Pesos';
import Tests from '../components/details/Tests';
import Vacunas from '../components/details/Vacunas';
import Desparasitaciones from '../components/details/Desparasitaciones';
import Intervenciones from '../components/details/Intervenciones';

interface DetalleLayoutProps {
  animal: AnimalDto;
}

const DetalleLayout: React.FC<DetalleLayoutProps> = ({ animal }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      
      {/* Primera fila - Info personal */}
      <Box>
        <PersonalInfo animal={animal} />
      </Box>

      {/* Segunda fila - Pesos y Tests */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ width: '30%' }}>
          <Pesos />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Tests />
        </Box>
      </Box>

      {/* Tercera fila - Vacunas y Desparasitaciones */}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ width: '50%' }}>
          <Vacunas />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Desparasitaciones />
        </Box>
      </Box>

      {/* Cuarta fila - Intervenciones */}
      <Box sx={{ width: '100%' }}>
        <Intervenciones />
      </Box>
    </Box>
  );
};

export default DetalleLayout;