import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import ResusableDetailsModal from '../shared/ResusableDetailsModal';

interface TestEntry {
  id: number;
  fecha: string;
  peso: number;
}

interface TestModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (test: TestEntry) => void;
  onDelete?: (id: number) => void;
  initialData?: TestEntry | null;
}

const PesosModal: React.FC<TestModalProps> = ({ open, onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState<TestEntry>(
    initialData || { id: 0, fecha: '', peso: 0 }
  );

  const handleChange = (field: keyof TestEntry) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && formData.id) {
      onDelete(formData.id);
    }
    onClose();
  };

  return (
    <ResusableDetailsModal
      open={open}
      onClose={onClose}
      title={formData.id ? 'Editar Peso' : 'Nuevo Peso'}
      onSave={handleSave}
      onDelete={formData.id ? handleDelete : undefined}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Fecha" value={formData.fecha} onChange={handleChange('fecha')} fullWidth />
        <TextField label="Tipo" value={formData.peso} onChange={handleChange('peso')} fullWidth /> 
      </Box>
    </ResusableDetailsModal>
  );
};

export default PesosModal;