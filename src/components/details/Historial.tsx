import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import { AnimalDto, HistorialDto } from '../../models/AnimalDto';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as HistorialService from '../../services/HistorialService';
import HistorialModal from './modals/HistorialModal';
import useAnimalStore from '../../stores/AnimalStore';
import formatDate from '../../utils/formatDate';

interface HistorialProps {
  animal: AnimalDto;
}

const Historial: React.FC<HistorialProps> = ({ animal }) => {

  const [currentEntry, setCurrentEntry] = useState<HistorialDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchAnimalById } = useAnimalStore();

const handleAdd = () => {
    setCurrentEntry(null);
    setModalOpen(true);
  };

  const handleEdit = (historial: HistorialDto) => {
    setCurrentEntry(historial);
    setModalOpen(true);
  };

  const handleSave = async (historial: HistorialDto) => {
    if (historial.id) {
      await HistorialService.updateHistorial(animal.id, historial);
    } else {
      await HistorialService.addHistorial(animal.id, historial);
    }
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await HistorialService.deleteHistorial(animal.id, id);
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6">Historial Médico</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
          Añadir al historial
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={8}>
          <Typography variant="body1">Revisión, Diagnostico y Tratamiento</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {animal?.historial.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={3}>
            <Typography variant="body2">{formatDate(entry.fecha)}</Typography>
          </Grid>
          <Grid size={8}>
            <Typography variant="body2">{entry.descripcion}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Modal */}
      <HistorialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentEntry ? handleDelete : undefined}
        initialData={currentEntry}
      />

    </Paper>
  );
};

export default Historial;