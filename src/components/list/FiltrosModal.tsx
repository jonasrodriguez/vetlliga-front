import React from 'react';
import { Box, Button, Modal, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
import { es } from 'date-fns/locale';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { AnimalType } from '../../enums/AnimalType';
import { useAnimalFilterStore } from '../../stores/AnimalFilterStore';
import { estadoOptions, localizacionPerrosOptions, localizacionGatosOptions } from '../../constants/animalOptions';

interface AnimalListFiltrosModalProps {
  type: AnimalType;
  isOpen: boolean;
  onClose: () => void;
}

const AnimalListFiltrosModal: React.FC<AnimalListFiltrosModalProps> = ({ isOpen, type, onClose }) => {
  const { filters, setFilter, resetFilters } = useAnimalFilterStore();

  const handleDateChange = (key: keyof typeof filters) => (newValue: Date | null) => {
    setFilter(key, newValue ? format(newValue, 'yyyy-MM') : undefined);
  };

  const estadoSelection = [
    <MenuItem key="-" value={undefined}>-</MenuItem>,
    <MenuItem key="0" value={0}>En protectora</MenuItem>,
    <MenuItem key="1" value={1}>En acogida</MenuItem>,
    <MenuItem key="2" value={2}>Reservado</MenuItem>,
    <MenuItem key="3" value={3}>Adoptado</MenuItem>,
    <MenuItem key="4" value={4}>Fallecido</MenuItem>,  
  ];

  const localizacionPerros = [
    <MenuItem key="-" value={undefined}>-</MenuItem>,
    <MenuItem key="1" value={1}>Nivel 1</MenuItem>,
    <MenuItem key="2" value={2}>Nivel 2/3</MenuItem>,
  ];

  const localizacionGatos = [
    <MenuItem key="-" value={undefined}>-</MenuItem>,
    <MenuItem key="0" value={0}>Hospitalización</MenuItem>,
    <MenuItem key="1" value={1}>Hospitalización Consulta</MenuItem>,
    <MenuItem key="2" value={2}>Cuarentena Entrada</MenuItem>,
    <MenuItem key="3" value={3}>Cuarentena Salida</MenuItem>,
    <MenuItem key="4" value={4}>Adaptación</MenuItem>,
    <MenuItem key="5" value={5}>Chiquipark</MenuItem>,
    <MenuItem key="6" value={6}>Patio Verde</MenuItem>,
    <MenuItem key="7" value={7}>Zona Leucemia</MenuItem>,
    <MenuItem key="8" value={8}>Antigua Adaptación</MenuItem>,
    <MenuItem key="9" value={9}>Colonia</MenuItem>,
    <MenuItem key="10" value={10}>Colonia Externa</MenuItem>,
    <MenuItem key="11" value={11}>Propietario</MenuItem>,
  ];


const renderMenuItems = ( options: { value: string | number | undefined; label: string }[]) => [
  <MenuItem key="-" value={undefined}>-</MenuItem>,
  ...options.map(opt => (
    <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
  )),
];
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Aplicar Filtros
          </Button>
          <Button
            variant="contained"
            onClick={resetFilters}
            sx={{
              backgroundColor: 'red',
              '&:hover': { backgroundColor: 'darkred' },
            }}
          >
            Resetear Filtros
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Estado & Fecha Estado */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                value={filters.estado ?? ''}
                onChange={(e) => setFilter('estado', e.target.value ? e.target.value : undefined) }
              >
                {renderMenuItems(estadoOptions)}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                views={['month', 'year']}
                label="Fecha Estado"
                value={filters.fechaEstado ? new Date(filters.fechaEstado) : null}
                onChange={handleDateChange('fechaEstado')}
                minDate={new Date(2010, 0)}
                maxDate={new Date(new Date().getFullYear(), 11)}
              />
            </LocalizationProvider>
          </Box>

          {/* Localización & Fecha Localización */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Localización</InputLabel>
              <Select
                label="Localización"
                value={filters.localizacion ?? ''}
                onChange={(e) => setFilter('localizacion', e.target.value ? e.target.value : undefined) }
              >
                {type === AnimalType.GATOS
                  ? renderMenuItems(localizacionGatosOptions)
                  : renderMenuItems(localizacionPerrosOptions)}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                views={['month', 'year']}
                label="Fecha Localización"
                value={filters.fechaLocalizacion ? new Date(filters.fechaLocalizacion) : null}
                onChange={handleDateChange('fechaLocalizacion')}
                minDate={new Date(2010, 0)}
                maxDate={new Date(new Date().getFullYear(), 11)}
              />
            </LocalizationProvider>
          </Box>

          <Divider />

          {/* Vacunación */}
          <Typography variant="subtitle1">Última vacunación</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Desde"
                value={filters.ultimaVacunaDesde ? new Date(filters.ultimaVacunaDesde) : null}
                onChange={(newValue) => setFilter('ultimaVacunaDesde', newValue ? format(newValue, 'yyyy-MM-dd') : undefined)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="Hasta"
                value={filters.ultimaVacunaHasta ? new Date(filters.ultimaVacunaHasta) : null}
                onChange={(newValue) => setFilter('ultimaVacunaHasta', newValue ? format(newValue, 'yyyy-MM-dd') : undefined)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Box>

          {/* Desparasitación */}
          <Typography variant="subtitle1">Última desparasitación</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Desde"
                value={filters.ultimaParasitoDesde ? new Date(filters.ultimaParasitoDesde) : null}
                onChange={(newValue) => setFilter('ultimaParasitoDesde', newValue ? format(newValue, 'yyyy-MM-dd') : undefined)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="Hasta"
                value={filters.ultimaParasitoHasta ? new Date(filters.ultimaParasitoHasta) : null}
                onChange={(newValue) => setFilter('ultimaParasitoHasta', newValue ? format(newValue, 'yyyy-MM-dd') : undefined)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Box>

          {/* Test */}
          <Typography variant="subtitle1">Último test</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Desde"
                value={filters.ultimoTestDesde ? new Date(filters.ultimoTestDesde) : null}
                onChange={(newValue) => setFilter('ultimoTestDesde', newValue ? format(newValue, 'yyyy-MM-dd') : undefined)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="Hasta"
                value={filters.ultimoTestHasta ? new Date(filters.ultimoTestHasta) : null}
                onChange={(newValue) => setFilter('ultimoTestHasta', newValue ? format(newValue, 'yyyy-MM-dd') : undefined)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AnimalListFiltrosModal;
