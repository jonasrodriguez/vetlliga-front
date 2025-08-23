import React, { useState } from "react";
import { Modal, Box, Typography, TextField, IconButton, Divider, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';
import { Close, Add, Edit } from "@mui/icons-material";

import { AnimalDto, HistorialDto, initialHistorial } from "../../../models/AnimalDto";
import DeleteConfirmation from "../../shared/DeleteConfirmation";
import formatDate from '../../../utils/formatDate';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (intervencion: HistorialDto) => void;
  onDelete: (id: number) => void;
  animal: AnimalDto;
};

const style = {
  position: "absolute" as const,
  top: "5%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 1200,
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
};

const HistorialModal: React.FC<ModalProps> = ({ open, onClose, onSave, onDelete, animal }) => {

  const [toggleNewEntry, setToggleNewEntry] = useState(false);
  const [toggleEdit, setToggleEdit] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<HistorialDto>(initialHistorial);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleChange = (field: keyof HistorialDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onNewEntry = () => {
    setToggleEdit(undefined);
    setToggleNewEntry(true);
    setFormData(initialHistorial);
  };

  const onEdit = (historial: HistorialDto) => {
    setToggleNewEntry(false);
    setToggleEdit(historial.id);
    setFormData(animal.historial.find(entry => entry.id === historial.id) || initialHistorial);
  }

  const onCancel = () => {
    setToggleNewEntry(false);
    setToggleEdit(undefined);
    setFormData(initialHistorial);
  };

  const onGuardar = () => {
    setToggleNewEntry(false);
    setToggleEdit(undefined);
    onSave(formData);
  };

  const closingModal = () => {
    onCancel();
    onClose();
  }

  const onDeleteClick = (historial: HistorialDto) => {
    setFormData(historial);
    setDeleteConfirmationOpen(true);
  }

  const handleCancelConfirm = () => {
    setDeleteConfirmationOpen(false);
    setFormData(initialHistorial);
  };

  const handleDeleteConfirm = () => {
    setDeleteConfirmationOpen(false);
    if (formData.id) {
      onDelete(formData.id);
    }
  };

  const editEntry = (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DatePicker
          label="Fecha"
          value={formData.fecha ? new Date(formData.fecha) : null}
          onChange={handleFechaChange}
          sx={{ width: 250 }}
        />
        <TextField
          label="Revisión, Diagnostico y Tratamiento"
          value={formData.descripcion}
          onChange={handleChange('descripcion')}
          fullWidth
          multiline
          rows={10}
          sx={{ width: "90%" }}
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2, gap: 2 }}>
          <Button variant="contained" color="primary" onClick={onGuardar}>
            Guardar
          </Button>
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
    </LocalizationProvider>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Historial Médico de {animal?.nombre}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button startIcon={<Add />} variant="contained" color="primary" onClick={onNewEntry}>
              Nueva entrada
            </Button>
            <IconButton onClick={closingModal}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mt: 2 }} />

        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }}>
          {toggleNewEntry && editEntry}
          {animal?.historial.map((entry, idx) => (
            toggleEdit === entry.id ? 
            <>
              {editEntry}
            </>
            : 
            <Box key={idx} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {formatDate(entry.fecha)}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton onClick={() => onEdit(entry)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDeleteClick(entry)}>
                  <Close />
                </IconButton>
              </Box>              
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {entry.descripcion}
              </Typography>
              <Divider />
            </Box>
          ))}   
        </Box>      
        <DeleteConfirmation 
          confirmOpen={deleteConfirmationOpen}
          handleCancelDelete={handleCancelConfirm}
          handleConfirmDelete={handleDeleteConfirm}
        />
      </Box>
    </Modal>
  );
};

export default HistorialModal;