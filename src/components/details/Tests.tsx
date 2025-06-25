import { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import TestsModal from './modals/TestsModal';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { AnimalDto, TestDto } from '../../models/AnimalDto';
import * as TestService from '../../services/TestsService';
import useAnimalStore from '../../stores/AnimalStore';
import formatDate from '../../utils/formatDate';

interface TestsProps {
  animal: AnimalDto;
}

const Tests: React.FC<TestsProps> = ({ animal }) => {

  const [currentEntry, setCurrentEntry] = useState<TestDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchAnimalById } = useAnimalStore();

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
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await TestService.deleteTest(animal.id, id);
    await fetchAnimalById(animal.id, true);
    setModalOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Tests y Pruebas Especificas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
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
            <IconButton onClick={() => handleEdit(entry)} size="small">
              <EditIcon fontSize="small" />
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