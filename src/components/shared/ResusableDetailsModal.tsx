import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton, Dialog, DialogTitle, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  onDelete?: () => void;
  saveLabel?: string;  
}

const ResusableDetailsModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSave,
  onDelete,
  saveLabel = 'Guardar',
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => setConfirmOpen(true);

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    if (onDelete) onDelete();
  };

  const handleCancelDelete = () => setConfirmOpen(false);

  const deleteConfirmation = (
    <Dialog open={confirmOpen} onClose={handleCancelDelete}>
      <DialogTitle>¿Estás seguro de que deseas eliminar?</DialogTitle>
      <DialogActions>
        <Button onClick={handleCancelDelete} color="primary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <IconButton aria-label="close" onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            {onSave && (
              <Button variant="contained" color="primary" onClick={onSave}>
                {saveLabel}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClick}
                sx={{
                  backgroundColor: (theme) => theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.error.dark,
                    boxShadow: '0px 4px 20px 0px rgba(211,47,47,0.2)',
                  },
                }}
              >
                Borrar
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      {deleteConfirmation}
    </>
  );
};

export default ResusableDetailsModal;