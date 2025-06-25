import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import ResusableDetailsModal from '../../shared/ResusableDetailsModal';
import { HistorialDto, initialHistorial } from '../../../models/AnimalDto';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (intervencion: HistorialDto) => void;
  onDelete?: (id: number) => void;
  initialData?: HistorialDto | null;
}

const HistorialModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState<HistorialDto>(initialData || initialHistorial);

  useEffect(() => {
    setFormData(initialData || initialHistorial);
  }, [initialData, open]);

  const handleChange = (field: keyof HistorialDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleFechaChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      fecha: date ? date.toISOString().split('T')[0] : '',
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
        title={isEdit ? 'Editar Historial' : 'Nueva Entrada Historial'}
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
            label="Revisión, Diagnostico y Tratamiento"
            value={formData.descripcion}
            onChange={handleChange('descripcion')}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </ResusableDetailsModal>
    </LocalizationProvider>
  );
};

export default HistorialModal;