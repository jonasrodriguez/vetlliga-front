import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Add, Search, SaveAlt, FilterList } from '@mui/icons-material';
import { AnimalType } from '../../enums/AnimalType';
import AnimalListFiltrosModal from './FiltrosModal';
import { useAnimalFilterStore } from '../../stores/AnimalFilterStore';

interface ListadoFiltrosProps {
  type: AnimalType;
  onAddClick: () => void;
  onExcelClick: () => void;
}

const AnimalListControles: React.FC<ListadoFiltrosProps> = ({ type, onAddClick, onExcelClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, setFilter } = useAnimalFilterStore();
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const tipoAnimal = type === AnimalType.GATOS ? 'Gatos' : 'Perros'

  const handleSearchClick = () => {
    setFilter('search', searchInput.trim());
  };
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Listado {tipoAnimal}
          {/*estadoEnum !== null &&
            <Box component="span" sx={{ marginLeft: 2 }}>
              <EstadoChip estado={estadoEnum} />
            </Box>
          */}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              height: '56px',
              marginRight: 2,
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
            onClick={handleOpenModal}
          >
            Filtros
          </Button>
          <TextField
            label="Buscar"
            variant="outlined"
            sx={{ width: 350 }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="success" onClick={onExcelClick} startIcon={<SaveAlt />} >
          Descargar Datos
        </Button>
        <Button variant="contained" color="success" onClick={onAddClick} startIcon={<Add />} >
          Alta {type === AnimalType.GATOS ? 'Gato' : 'Perro'}
        </Button>
      </Box>

      <AnimalListFiltrosModal type={type} isOpen={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default AnimalListControles;