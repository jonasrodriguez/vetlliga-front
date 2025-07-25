import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import ResusableDetailsModal from '../../shared/ResusableDetailsModal';
import { PesoDto } from '../../../models/AnimalDto';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';

interface PesoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (peso: PesoDto) => void;
  onDelete?: (id: number) => void;
  initialData?: PesoDto | null;
}

const PesosModal: React.FC<PesoModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState<PesoDto>(
    initialData || { fecha: new Date().toISOString(), peso: 0 }
  );

  useEffect(() => {
    setFormData(initialData || { fecha: new Date().toISOString(), peso: 0 });
  }, [initialData, open]);

  const handleChange = (field: keyof PesoDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'peso' ? Number(event.target.value) : event.target.value,
    }));
  };

  const handleFechaChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      fecha: date ? date.toISOString() : '',
    }));
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <ResusableDetailsModal
        open={open}
        onClose={onClose}
        title={isEdit ? 'Editar Peso' : 'Nuevo Peso'}
        onSave={handleSave}
        onDelete={formData.id ? handleDelete : undefined}
        saveLabel={isEdit ? 'Actualizar' : 'Guardar'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DatePicker
            label="Fecha"
            value={formData.fecha ? new Date(formData.fecha) : null}
            onChange={handleFechaChange}
            sx={{ width: '100%' }}
          />
          <TextField
            label="Peso (kg)"
            type="number"
            value={formData.peso}
            onChange={handleChange('peso')}
            fullWidth
          />
        </Box>
      </ResusableDetailsModal>
    </LocalizationProvider>
  );
};

export default PesosModal;