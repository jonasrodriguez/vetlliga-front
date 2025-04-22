import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface DesparasitacionEntry {
  id: number;
  fecha: string;
  tipo: string;
}

const Desparasitaciones = () => {
  const [desparasitaciones, setDesparasitaciones] = useState<DesparasitacionEntry[]>([
    { id: 1, fecha: '2025-03-20', tipo: 'Interna' },
    { id: 2, fecha: '2025-04-10', tipo: 'Externa' },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Edit desparasitacion with ID: ${id}`);
    // Add your edit logic here
  };

  const handleAdd = () => {
    console.log("Add new desparasitacion entry");
    // Add your add logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Desparasitaciones</Typography>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={6}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={5}>
          <Typography variant="body1">Tipo</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {desparasitaciones.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={6}>
            <Typography variant="body2">{entry.fecha}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">{entry.tipo}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry.id)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add New Desparasitacion Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Nueva Desparasitación
        </Button>
      </Box>
    </Paper>
  );
};

export default Desparasitaciones;