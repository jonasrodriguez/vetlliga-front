import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import DocumentosModal from './modals/DocumentosModal';
import * as DocumentoService from '../../services/DocumentoService';
import { AnimalDto } from '../../models/AnimalDto';
import formatDate from '../../utils/formatDate';
import DeleteConfirmation from '../shared/DeleteConfirmation';

import useAnimalStore from '../../stores/AnimalStore';
import { useAuthStore } from '../../stores/AuthStore';

interface DocumentosProps {
  animal: AnimalDto;
}

const Documentos: React.FC<DocumentosProps> = ({ animal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletion, setDeletion] = useState<number | null>(null);
  const isAdmin = useAuthStore((state) => state.isAdmin());
  
  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleUpload = async (file: File, descripcion: string) => {
    await DocumentoService.addDocumento(animal.id, file, descripcion);
    setModalOpen(false);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  const handleDeleteClick = (id: number) => setDeletion(id);

  const handleDelete = async () => {
    await DocumentoService.deleteDocumento(animal.id, deletion!);
    setDeletion(null);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  const handleCancelDelete = () => setDeletion(null);

  const downloadDocumento = async (id: number) => {
    await DocumentoService.getDocumento(animal.id, id);
  }

  const trimNombre = (nombre: string) => {
    const maxLength = 30;
    if (nombre.length <= maxLength) {
      return nombre;
    }

    const split = nombre.split('.');
    if (split.length > 1) {
      const extension = split.pop();
      return nombre.slice(0, maxLength) + '...' + extension;
    }

    return nombre.slice(0, maxLength) + '...';
  }; 

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6"> Documentos Adjuntos</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd} disabled={!isAdmin}>        
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
      {animal?.documentos.map((entry) => (
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
              {trimNombre(entry.nombre)}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">{entry.descripcion}</Typography>
          </Grid>          
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton size="small" onClick={() => entry.id ? handleDeleteClick(entry.id) : null} disabled={!isAdmin}>
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