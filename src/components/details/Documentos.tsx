import { Paper, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { AnimalDto } from '../../models/AnimalDto';

interface TestsProps {
  animal: AnimalDto;
}

const Documentos: React.FC<TestsProps> = () => {

  const handleAdd = () => {
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Documentos Adjuntos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>        
          Subir nuevo documento
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={4}>
          <Typography variant="body1">Descripcion</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="body1">Link</Typography>
        </Grid>
        <Grid size={1}>          
        </Grid>
      </Grid>

      {/* Grid Rows */}
      <Grid container spacing={2} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body2">24/06/2025</Typography>
        </Grid>
        <Grid size={4}>
          <Typography variant="body2">Resultados analitica</Typography>
        </Grid>
        <Grid size={2}>
          <a href="/documents/dummyTestResults.pdf" target="_blank" rel="noopener noreferrer">
            dummyTestResults.pdf (Dummy)
          </a>
        </Grid>
        <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body2">20/06/2025</Typography>
        </Grid>
        <Grid size={4}>
          <Typography variant="body2">Copia rayos</Typography>
        </Grid>
        <Grid size={2}>
          <a href="/documents/catXray.jpg" target="_blank" rel="noopener noreferrer">
            catXray.jpg (Dummy)
          </a>
        </Grid>
        <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

    </Paper>
  );
};

export default Documentos;