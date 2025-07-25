import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { AnimalDto } from '../models/AnimalDto';

import DetailsHeader from '../components/details/DetailsHeader';
import PersonalInfo from '../components/details/PersonalInfo';
import Pesos from '../components/details/Pesos';
import Tests from '../components/details/Tests';
import Vacunas from '../components/details/Vacunas';
import Desparasitaciones from '../components/details/Desparasitaciones';
import Intervenciones from '../components/details/Intervenciones';
import Documentos from '../components/details/Documentos';
import Historial from '../components/details/Historial';

interface DetalleLayoutProps {
  animal: AnimalDto;
  openHistorial?: boolean;
}

const DetalleLayout: React.FC<DetalleLayoutProps> = ({ animal, openHistorial }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (openHistorial) {
      setTabIndex(1);
    }
  }, [openHistorial]);

  const onHistorialClose = () => {
    setTabIndex(0);
  };

  const fichaPesos = {
    label: 'Informacion Personal',
    content: (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: '70%' }}>
          <PersonalInfo animal={animal} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Pesos animal={animal} />
        </Box>
      </Box>
    ),
  };

  const parasitos = {
    label: 'Desparasitaciones',
    content: (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: '50%' }}>
          <Desparasitaciones type="Interna" animal={animal} />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Desparasitaciones type="Externa" animal={animal} />
        </Box>
      </Box>
    ),
  };
  
  const vacunas ={
    label: 'Vacunas',
    content: <Vacunas animal={animal} />,
  };

  const inter ={
    label: 'Intervenciones',
    content: <Intervenciones animal={animal} />,
  };

  const tests ={
    label: 'Tests',
    content: <Tests animal={animal} />,
  };

  const historial ={
    label: 'Historial',
    content: <Historial animal={animal} onHistorialClose={onHistorialClose} />,
  };

  const docus ={
    label: 'Documentos',
    content: <Documentos animal={animal} />,
  };

  const tabs = [fichaPesos, historial, parasitos, vacunas, inter, tests, docus];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <DetailsHeader animal={animal} />
      </Box>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ mb: 2 }}>
        {tabs[tabIndex].content}
      </Box>
    </Box>
  );
};

export default DetalleLayout;
