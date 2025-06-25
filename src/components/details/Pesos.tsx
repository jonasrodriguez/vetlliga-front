import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PesosModal from './modals/PesosModal';
import { AnimalDto, PesoDto } from '../../models/AnimalDto';
import * as PesosService from '../../services/PesosService';
import useAnimalStore from '../../stores/AnimalStore';
import formatDate from '../../utils/formatDate';

interface PesosProps {
  animal: AnimalDto;
}

const Pesos: React.FC<PesosProps> = ({ animal }) => {

  const [currentPeso, setCurrentPeso] = useState<PesoDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchAnimalById } = useAnimalStore();
  
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
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await PesosService.deletePeso(animal.id, id);
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Pesos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
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
              <EditIcon fontSize="small" />
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