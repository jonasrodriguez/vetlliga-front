import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, Typography, Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
import { es } from 'date-fns/locale';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AnimalType } from '../../enums/AnimalType';
import { AnimalCriteria } from '../../models/AnimalCriteria';
import { estadoFiltroOptions } from '../../constants/animalOptions';

import { useAnimalFilterStore } from '../../stores/AnimalFilterStore';
import useConfigStore from '../../stores/ConfigStore';

interface AnimalListFiltrosModalProps {
  type: AnimalType;
  isOpen: boolean;
  onClose: () => void;
}

const AnimalListFiltrosModal: React.FC<AnimalListFiltrosModalProps> = ({ isOpen, type, onClose }) => {
  const { filters, setFilters, resetFilters } = useAnimalFilterStore();
  const { localizacionesGato, localizacionesPerro } = useConfigStore();
  const [tempFilter, setTempFilter] = useState<AnimalCriteria>({ ...filters });

  const isGato = type === AnimalType.GATOS;

  const applyFilters = () => {
    setFilters(tempFilter);
    onClose();
  }

  useEffect(() => {
    if (isOpen) {
      setTempFilter({ ...filters });
    }
  }, [isOpen, filters]);

  const handleDateChange = (key: keyof typeof filters) => (newDate: Date | null) => {
    setTempFilter({
      ...tempFilter,
      [key]: newDate ? newDate.toISOString().split("T")[0] : ""
    });
  };

  const estadoFiltro = (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select
          label="Estado"
          sx={{ width: 250 }}
          value={tempFilter.estado !== undefined ? tempFilter.estado : ''}
          onChange={(e) => setTempFilter({ ...tempFilter, estado: e.target.value ? Number(e.target.value) : undefined})}
        >
          <MenuItem key="-" value={undefined}>-</MenuItem>,
          {estadoFiltroOptions.map(opt => (
            <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DatePicker
          views={['month', 'year']}
          label="Fecha Estado"
          sx={{ minWidth: 250 }}
          value={tempFilter.fechaEstado ? new Date(tempFilter.fechaEstado) : null}
          onChange={handleDateChange('fechaEstado')}
          minDate={new Date(2010, 0)}
          maxDate={new Date(new Date().getFullYear(), 11)}
        />
      </LocalizationProvider>
    </Box>
  );

  const localizacionFiltro = (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Localización</InputLabel>
        <Select
          label="Localización"
          sx={{ width: 250 }}
          value={tempFilter.localizacion ?? ''}
          onChange={(e) => setTempFilter({ ...tempFilter, localizacion: e.target.value ? Number(e.target.value) : undefined }) }
        >
          <MenuItem key="-" value={undefined}>-</MenuItem>,
          {(isGato ? localizacionesGato : localizacionesPerro).map(opt => (
            <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DatePicker
          views={['month', 'year']}
          label="Fecha Localización"
          sx={{ minWidth: 250 }}
          value={tempFilter.fechaLocalizacion ? new Date(tempFilter.fechaLocalizacion) : null}
          onChange={handleDateChange('fechaLocalizacion')}
          minDate={new Date(2010, 0)}
          maxDate={new Date(new Date().getFullYear(), 11)}
        />
      </LocalizationProvider>
    </Box>    
  );

  const vacunacionFiltro = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Última vacunación
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="vacunación"
            sx={{ width: 250 }}
            value={tempFilter.vacuna ? new Date(tempFilter.vacuna) : null}
            onChange={handleDateChange('vacuna')}
          />
        </LocalizationProvider>
      </Box>    
    </>
  );

  const desparasitacionInternaFiltro = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Última desparasitación interna
        </Typography>        
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="Interna"
            sx={{ width: 250 }}
            value={tempFilter.desparasitoInterna ? new Date(tempFilter.desparasitoInterna) : null}
            onChange={handleDateChange('desparasitoInterna')}
          />
        </LocalizationProvider>
      </Box>    
    </>
  );

  const desparasitacionExternaFiltro = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Última desparasitación externa
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="Externa"
            sx={{ width: 250 }}
            value={tempFilter.desparasitoExterna ? new Date(tempFilter.desparasitoExterna) : null}
            onChange={handleDateChange('desparasitoExterna')}
          />
        </LocalizationProvider>
      </Box>    
    </>
  );

  const testFiltro = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Último test
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="Test"
            sx={{ width: 250 }}
            value={tempFilter.test ? new Date(tempFilter.test) : null}
            onChange={handleDateChange('test')}
          />
        </LocalizationProvider>
      </Box>
    </>
  );

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button  variant="contained" onClick={resetFilters} sx={{ backgroundColor: 'red','&:hover': { backgroundColor: 'darkred' }, } }>
            Resetear Filtros
          </Button>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Aplicar Filtros
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {estadoFiltro}
          {localizacionFiltro}
          <Divider />
          {vacunacionFiltro}
          {desparasitacionInternaFiltro}
          {desparasitacionExternaFiltro}
          {testFiltro}
        </Box>
      </Box>
    </Modal>
  );
};

export default AnimalListFiltrosModal;
