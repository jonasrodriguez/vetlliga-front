import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import { AnimalDto, IntervencionDto } from '../../models/AnimalDto';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as IntervencionService from '../../services/IntervencionService';
import IntervencionModal from './modals/IntervencionModal';
import formatDate from '../../utils/formatDate';

interface IntervencionProps {
  animal: AnimalDto;
}

const Intervenciones: React.FC<IntervencionProps> = ({ animal }) => {
  const [currentEntry, setCurrentEntry] = useState<IntervencionDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [intervenciones, setIntervenciones] = useState<IntervencionDto[]>(animal.intervenciones || []);

  const handleAdd = () => {
    setCurrentEntry(null);
    setModalOpen(true);
  };

  const handleEdit = (intervencion: IntervencionDto) => {
    setCurrentEntry(intervencion);
    setModalOpen(true);
  };

  const handleSave = async (intervencion: IntervencionDto) => {
    if (intervencion.id) {
      const update = await IntervencionService.updateIntervencion(animal.id, intervencion);
      setIntervenciones(prevIntervenciones => prevIntervenciones.map(i => i.id === update.id ? update : i));
    } else {
      const nueva = await IntervencionService.addIntervencion(animal.id, intervencion);
      setIntervenciones(prevIntervenciones => [nueva, ...prevIntervenciones]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await IntervencionService.deleteIntervencion(animal.id, id);
    setIntervenciones(prevIntervenciones => prevIntervenciones.filter(i => i.id !== id));
    setModalOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Intervenciones Quirurgicas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
          Nueva Intervención
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={8}>
          <Typography variant="body1">Descripción</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {intervenciones.map((entry) => (
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
      <IntervencionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentEntry ? handleDelete : undefined}
        initialData={currentEntry}
      />

    </Paper>
  );
};

export default Intervenciones;