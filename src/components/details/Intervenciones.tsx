import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface IntervencionEntry {
  id: number;
  fecha: string;
  tipo: string;
  descripcion: string;
}

const Intervenciones = () => {
  const [intervenciones, setIntervenciones] = useState<IntervencionEntry[]>([
    { id: 1, fecha: '2025-04-01', tipo: 'Cirugía', descripcion: 'Esterilización' },
    { id: 2, fecha: '2025-04-15', tipo: 'Tratamiento', descripcion: 'Desparasitación interna' },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Edit intervencion with ID: ${id}`);
    // Add your edit logic here
  };

  const handleAdd = () => {
    console.log("Add new intervencion entry");
    // Add your add logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Intervenciones</Typography>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="body1">Tipo</Typography>
        </Grid>
        <Grid size={5}>
          <Typography variant="body1">Descripción</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {intervenciones.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={3}>
            <Typography variant="body2">{entry.fecha}</Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant="body2">{entry.tipo}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">{entry.descripcion}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry.id)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add New Intervencion Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Nueva Intervención
        </Button>
      </Box>
    </Paper>
  );
};

export default Intervenciones;