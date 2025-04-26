import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { es } from 'date-fns/locale';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import EstadoChip from '../shared/EstadoChip';
import { EstadoAnimal } from '../../models/EstadoAnimal';

interface ListadoFiltrosProps {
  type: 'Gatos' | 'Perros';
  estadoEnum: EstadoAnimal | null;
  search: string;
  setSearch: (value: string) => void;
  statusDate: string;
  setStatusDate: (value: string) => void;
  onAddClick: () => void;
}

const AnimalListFiltros: React.FC<ListadoFiltrosProps> = ({
  type,
  estadoEnum,
  search,
  setSearch,
  statusDate,
  setStatusDate,
  onAddClick,
}) => {
  return (
    <Box sx={{ display:'flex', flexDirection:'column', marginBottom: 2 }}>
      {/* Title and Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Listado {type}
          {estadoEnum !== null && (
            <Box component="span" sx={{ marginLeft: 2 }}>
              <EstadoChip estado={estadoEnum} />
            </Box>
          )}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={onAddClick}
          startIcon={<Add />}
        >
          Añadir {type === 'Gatos' ? 'Gato' : 'Perro'}
        </Button>
      </Box>

      {/* Search and Filter Inputs */}
      {estadoEnum != null &&
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle1">Filtro fecha estado</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
          <DatePicker
            views={['year', 'month']} // Restrict to year and month selection
            label="Mes y Año"
            value={statusDate ? new Date(statusDate) : null}
            minDate={new Date(2010, 0)}
            maxDate={new Date(new Date().getFullYear(), 11)}
            onChange={(newValue) => {
              if (newValue) {
                setStatusDate(format(newValue, 'yyyy-MM')); // Format as "YYYY-MM"
              } else {
                setStatusDate('');
              }
            }}
          />
        </LocalizationProvider>
      </Box>
      }
      <TextField
          label="Buscar"
          variant="outlined"
          fullWidth={!estadoEnum}
          sx={{ flex: estadoEnum ? 1 : undefined }}
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
    </Box>
  );
};

export default AnimalListFiltros;