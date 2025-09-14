import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import {Add, Edit} from '@mui/icons-material';

import { AnimalDto, VacunacionDto } from '../../models/AnimalDto';
import formatDate from '../../utils/formatDate';
import * as VacunasService from '../../services/VacunasService';
import VacunasModal from './modals/VacunasModal';

import useAnimalStore from '../../stores/AnimalStore';
import { useAuthStore } from '../../stores/AuthStore';

interface VacunacionProps {
  animal: AnimalDto;
}

const Vacunas: React.FC<VacunacionProps> = ({ animal }) => {
  const [currentVacunacion, setCurrentVacunacion] = useState<VacunacionDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const handleAdd = () => {
    setCurrentVacunacion(null);
    setModalOpen(true);
  };

  const handleEdit = (vacunacion: VacunacionDto) => {
    setCurrentVacunacion(vacunacion);
    setModalOpen(true);
  };

  const handleSave = async (vacunacion: VacunacionDto) => {
    if (vacunacion.id) {
      await VacunasService.updateVacuna(animal.id, vacunacion);
    } else {
      await VacunasService.addVacuna(animal.id, vacunacion);
    }
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  const handleDelete = async (id: number) => {
    await VacunasService.deleteVacuna(animal.id, id);
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Vacunaciones</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd} disabled={!isAdmin}>        
          Nueva Vacunación
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={4}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={5}>
          <Typography variant="body1">Vacuna</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="body1">Producto</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {animal?.vacunaciones.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={4}>
            <Typography variant="body2">{formatDate(entry.fecha)}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">{entry.tipo}</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">{entry.producto}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry)} size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Vacunas Modal */}
      <VacunasModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentVacunacion ? handleDelete : undefined}
        initialData={currentVacunacion}
      />
      
    </Paper>
  );
};

export default Vacunas;