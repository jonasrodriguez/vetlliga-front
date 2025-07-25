import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import ResusableDetailsModal from '../../shared/ResusableDetailsModal';
import { IntervencionDto, initialIntervencion } from '../../../models/AnimalDto';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (intervencion: IntervencionDto) => void;
  onDelete?: (id: number) => void;
  initialData?: IntervencionDto | null;
}

const IntervencionModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState<IntervencionDto>(initialData || initialIntervencion);

  useEffect(() => {
    setFormData(initialData || initialIntervencion);
  }, [initialData, open]);

  const handleChange = (field: keyof IntervencionDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
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
        title={isEdit ? 'Editar Intervencion' : 'Nueva Intervencion'}
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
            label="Descripción"
            value={formData.descripcion}
            onChange={handleChange('descripcion')}
            fullWidth
          />
        </Box>
      </ResusableDetailsModal>
    </LocalizationProvider>
  );
};

export default IntervencionModal;