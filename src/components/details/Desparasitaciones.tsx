import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AnimalDto, DesparasitacionDto } from '../../models/AnimalDto';
import * as DesparasitacionesService from '../../services/DesparasitacionesService';
import DesparasitacionesModal from './modals/DesparasitacionesModal';
import useAnimalStore from '../../stores/AnimalStore';
import formatDate from '../../utils/formatDate';

interface DesparasitacionesProps {
  animal: AnimalDto;
  type: 'Interna' | 'Externa';
}

const Desparasitaciones: React.FC<DesparasitacionesProps> = ({ animal, type }) => {

  const [currentEntry, setCurrentEntry] = useState<DesparasitacionDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchAnimalById } = useAnimalStore();

  const handleAdd = () => {
    setCurrentEntry(null);
    setModalOpen(true);
  };

  const handleEdit = (desparasitacion: DesparasitacionDto) => {
    setCurrentEntry(desparasitacion);
    setModalOpen(true);
  };

  const handleSave = async (desparasitacion: DesparasitacionDto) => {
    if (desparasitacion.id) {
      await DesparasitacionesService.updateDesparasitacion(animal.id, desparasitacion);
    } else {
      await DesparasitacionesService.addDesparasitacion(animal.id, desparasitacion);
    }
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await DesparasitacionesService.deleteDesparasitacion(animal.id, id);
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Desparasitación {type}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
          Nueva Desparasitación {type}
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={4}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={7}>
          <Typography variant="body1">Tipo</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {animal?.desparasitaciones.filter((entry) => entry.tipo.toLowerCase() === type.toLowerCase()).map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={4}>
            <Typography variant="body2">{formatDate(entry.fecha)}</Typography>
          </Grid>
          <Grid size={7}>
            <Typography variant="body2">{entry.producto}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Modal */}
      <DesparasitacionesModal
        type={type}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentEntry ? handleDelete : undefined}
        initialData={currentEntry}
      />

    </Paper>
  );
};

export default Desparasitaciones;