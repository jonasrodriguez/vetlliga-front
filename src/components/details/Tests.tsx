import { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import {Add, Edit} from '@mui/icons-material';

import TestsModal from './modals/TestsModal';
import { AnimalDto, TestDto } from '../../models/AnimalDto';
import * as TestService from '../../services/TestsService';
import formatDate from '../../utils/formatDate';

import useAnimalStore from '../../stores/AnimalStore';
import { useAuthStore } from '../../stores/AuthStore';

interface TestsProps {
  animal: AnimalDto;
}

const Tests: React.FC<TestsProps> = ({ animal }) => {
  const [currentEntry, setCurrentEntry] = useState<TestDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const handleAdd = () => {
    setCurrentEntry(null);
    setModalOpen(true);
  };

  const handleEdit = (test: TestDto) => {
    setCurrentEntry(test);
    setModalOpen(true);
  };

  const handleSave = async (test: TestDto) => {
    if (test.id) {
      await TestService.updateTest(animal.id, test);
    } else {
      await TestService.addTest(animal.id, test);
    }
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  const handleDelete = async (id: number) => {
    await TestService.deleteTest(animal.id, id);
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Tests y Pruebas Especificas</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd} disabled={!isAdmin}>        
          Nuevo Test
        </Button>
      </Box>

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
      {animal?.tests.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={3}>
            <Typography variant="body2">{formatDate(entry.fecha)}</Typography>
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
            <IconButton onClick={() => handleEdit(entry)} size="small" disabled={!isAdmin}>
              <Edit fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}      

      {/* Modal */}
      <TestsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={currentEntry ? handleDelete : undefined}
        initialData={currentEntry}
      />

    </Paper>
  );
};

export default Tests;