import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import ResusableDetailsModal from '../../shared/ResusableDetailsModal';
import { DesparasitacionDto } from '../../../models/AnimalDto';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';

interface ModalProps {
  open: boolean;
  type: 'Interna' | 'Externa';
  onClose: () => void;
  onSave: (desparasitacion: DesparasitacionDto) => void;
  onDelete?: (id: number) => void;
  initialData?: DesparasitacionDto | null;
}

const DesparasitacionesModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  initialData,
  type
}) => {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState<DesparasitacionDto>(initialData || { 
    fecha: new Date().toISOString(),
    tipo: type.toUpperCase(),
    producto: '',
  });

  useEffect(() => {
    setFormData(initialData || { 
      fecha: new Date().toISOString(),
      tipo: type.toUpperCase(),
      producto: '',
    });
  }, [initialData, open, type]);

  const handleChange = (field: keyof DesparasitacionDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
        title={isEdit ? 'Editar Desparasitacion' : 'Nueva Desparasitacion'}
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
            label="Tipo"
            value={formData.tipo}
            onChange={handleChange('tipo')}
            fullWidth
            disabled
          />
          <TextField
            label="Producto"
            value={formData.producto}
            onChange={handleChange('producto')}
            fullWidth
          />          
        </Box>
      </ResusableDetailsModal>
    </LocalizationProvider>
  );
};

export default DesparasitacionesModal;