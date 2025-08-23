import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import ResusableDetailsModal from '../../shared/ResusableDetailsModal';

interface DocumentosModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File, descripcion: string) => Promise<void>;
  onDelete?: (id: number) => void;
}

const DocumentosModal: React.FC<DocumentosModalProps> = ({ open, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [descripcion, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setLoading(false);
    }
  }, [open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onUploadClick = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await onUpload(file, descripcion);
      handleClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setDescription('');
    onClose();
  };

  return (
    <ResusableDetailsModal
      open={open}
      onClose={handleClose}
      title="Subir archivo"
      onSave={onUploadClick}
      saveLabel="Subir"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!file && <Button variant="contained" color="primary" component="label">
          Seleccionar archivo
          <input type="file" hidden onChange={handleFileChange} />
        </Button>}
        {file && <Box>Archivo seleccionado: {file.name}</Box>}
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </ResusableDetailsModal>
  );
};

export default DocumentosModal;
