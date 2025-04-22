import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface PesoEntry {
  id: number;
  fecha: string;
  peso: number;
}

const Pesos = () => {
  const [pesos, setPesos] = useState<PesoEntry[]>([
    { id: 1, fecha: '2025-04-01', peso: 4.5 },
    { id: 2, fecha: '2025-04-08', peso: 4.7 },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Edit test with ID: ${id}`);
    // Add your edit logic here
  };

  const handleAdd = () => {
    console.log("Add new peso entry");
    // Add your add logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6"> Pesos</Typography>

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
      {pesos.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={6}>
            <Typography variant="body2">{entry.fecha}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">{entry.peso} kg</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleEdit(entry.id)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add New Peso Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
          Nuevo Peso
        </Button>
      </Box>
    </Paper>
  );
};

export default Pesos;