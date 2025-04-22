import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface VacunacionEntry {
  id: number;
  fecha: string;
  vacuna: string;
  lote: string;
}

const Vacunas = () => {
  const [vacunaciones, setVacunaciones] = useState<VacunacionEntry[]>([
    { id: 1, fecha: '2025-04-01', vacuna: 'Rabia', lote: 'L12345' },
    { id: 2, fecha: '2025-04-15', vacuna: 'Parvovirus', lote: 'L67890' },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Edit vacunacion with ID: ${id}`);
    // Add your edit logic here
  };

  const handleAdd = () => {
    console.log("Add new vacunacion entry");
    // Add your add logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Vacunaciones</Typography>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={4}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={5}>
          <Typography variant="body1">Vacuna</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="body1">Lote</Typography>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>

      {/* Grid Rows */}
      {vacunaciones.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={4}>
            <Typography variant="body2">{entry.fecha}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">{entry.vacuna}</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">{entry.lote}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry.id)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add New Vacunacion Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Nueva Vacunación
        </Button>
      </Box>
    </Paper>
  );
};

export default Vacunas;