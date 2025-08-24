import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import DocumentosModal from './modals/DocumentosModal';
import * as DocumentoService from '../../services/DocumentoService';
import { AnimalDto } from '../../models/AnimalDto';
import formatDate from '../../utils/formatDate';
import DeleteConfirmation from '../shared/DeleteConfirmation';

interface DocumentosProps {
  animal: AnimalDto;
}

const Documentos: React.FC<DocumentosProps> = ({ animal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletion, setDeletion] = useState<number | null>(null);
  const [documentos, setDocumentos] = useState(animal.documentos || []);
  
  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleUpload = async (file: File, descripcion: string) => {
    const newDocu = await DocumentoService.addDocumento(animal.id, file, descripcion);
    setDocumentos(prevDocumentos => [newDocu, ...prevDocumentos]);
    setModalOpen(false);
  };

  const handleDeleteClick = (id: number) => setDeletion(id);

  const handleDelete = async () => {
    await DocumentoService.deleteDocumento(animal.id, deletion!);
    setDocumentos(prevDocumentos => prevDocumentos.filter(d => d.id !== deletion));
    setDeletion(null);
  };

  const handleCancelDelete = () => setDeletion(null);

  const downloadDocumento = async (id: number) => {
    await DocumentoService.getDocumento(animal.id, id);
  }

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Documentos Adjuntos</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>        
          Subir nuevo documento
        </Button>
      </Box>

      {/* Grid Headers */}
      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={2}>
          <Typography variant="body1">Fecha</Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="body1">Nombre</Typography>
        </Grid>
        <Grid size={4}>
          <Typography variant="body1">Descripcion</Typography>
        </Grid>
        <Grid size={1}>          
        </Grid>
      </Grid>

      {/* Grid Rows */}
      {documentos.map((entry) => (
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={2}>
            <Typography variant="body2">{formatDate(entry.fecha)}</Typography>
          </Grid>
          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": { color: "darkblue" },
              }}
              onClick={() => entry.id ? downloadDocumento(entry.id) : null}
            >
              {entry.nombre}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">{entry.descripcion}</Typography>
          </Grid>          
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton size="small" onClick={() => entry.id ? handleDeleteClick(entry.id) : null}>
              <Delete fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}


      {/* Modal */}
      <DocumentosModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpload={handleUpload}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        confirmOpen={deletion !== null}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleDelete}
      />

    </Paper>
  );
};

export default Documentos;