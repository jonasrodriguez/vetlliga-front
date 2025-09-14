import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import {Add, Edit} from '@mui/icons-material';

import PesosModal from './modals/PesosModal';
import { AnimalDto, PesoDto } from '../../models/AnimalDto';
import * as PesosService from '../../services/PesosService';
import formatDate from '../../utils/formatDate';

import useAnimalStore from '../../stores/AnimalStore';
import { useAuthStore } from '../../stores/AuthStore';

interface PesosProps {
  animal: AnimalDto;
}

const Pesos: React.FC<PesosProps> = ({ animal }) => {
  const [currentPeso, setCurrentPeso] = useState<PesoDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const handleAdd = () => {
    setCurrentPeso(null);
    setModalOpen(true);
  };

  const handleEdit = (peso: PesoDto) => {
    setCurrentPeso(peso);
    setModalOpen(true);
  };

  const handleSave = async (peso: PesoDto) => {
    if (peso.id) {
      await PesosService.updatePeso(animal.id, peso);
    } else {
      await PesosService.addPeso(animal.id, peso);
    }
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  const handleDelete = async (id: number) => {
    await PesosService.deletePeso(animal.id, id);
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Pesos</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd} disabled={!isAdmin}>        
          Nuevo Peso
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={6}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={5}>
          <Typography variant="body1">Peso (kg)</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {animal?.pesos.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={6}>
            <Typography variant="body2">{formatDate(entry.fecha)}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">{entry.peso} kg</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry)} size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Modal */}
      <PesosModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentPeso ? handleDelete : undefined}
        initialData={currentPeso}
      />
      
    </Paper>
  );
};

export default Pesos;