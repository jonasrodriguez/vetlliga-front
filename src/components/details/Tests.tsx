import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import TestsModal from './TestsModal';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface TestEntry {
  id: number;
  fecha: string;
  tipo: string;
  resultado: string;
  lote: string;
}

const Tests = () => {
  const [tests, setTests] = useState<TestEntry[]>([
    { id: 1, fecha: "2025-04-01", tipo: "Uranotest FeLV-FiV", resultado: "Positivo", lote: "L12345" },
    { id: 2, fecha: "2025-04-10", tipo: "Test FeLV-FiV", resultado: "Negativo", lote: "L98765" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState<TestEntry | null>(null);

  const handleAdd = () => {
    setCurrentTest(null); // Clear current test for adding
    setModalOpen(true);
  };

  const handleEdit = (test: TestEntry) => {
    setCurrentTest(test); // Set the test to edit
    setModalOpen(true);
  };

  const handleSave = (test: TestEntry) => {
    if (test.id) {
      // Edit existing test
      setTests((prev) => prev.map((t) => (t.id === test.id ? test : t)));
    } else {
      // Add new test
      setTests((prev) => [...prev, { ...test, id: prev.length + 1 }]);
    }
  };

  const handleDelete = (id: number) => {
    setTests((prev) => prev.filter((test) => test.id !== id));
  }

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
      <Typography variant="h6">Tests</Typography>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={4}>
          <Typography variant="body1">Tipo</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="body1">Resultado</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="body1">Lote</Typography>
        </Grid>
        <Grid size={1}>          
        </Grid>
      </Grid>

      {/* Grid Rows */}
      {tests.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={3}>
            <Typography variant="body2">{entry.fecha}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">{entry.tipo}</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">{entry.resultado}</Typography>
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

      {/* Add New Test Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2, // Rounded corners
            '&:hover': { bgcolor: 'darkgreen' },
          }}
          onClick={handleAdd}
        >
          Nuevo Test
        </Button>
      </Box>

      {/* Modal */}
      <TestsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentTest ? handleDelete : undefined}
        initialData={currentTest}
      />

    </Paper>
  );
};

export default Tests;