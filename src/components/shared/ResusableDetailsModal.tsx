import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void; // Optional save handler
  onDelete?: () => void; // Optional delete handler
  saveLabel?: string; // Custom label for the save button
  deleteLabel?: string; // Custom label for the delete button
}

const ResusableDetailsModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSave,
  onDelete,
  saveLabel = 'Save',
  deleteLabel = 'Delete',
}) => {
  return (
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
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          {onDelete && (
            <Button variant="outlined" color="error" onClick={onDelete}>
              {deleteLabel}
            </Button>
          )}
          {onSave && (
            <Button variant="contained" onClick={onSave}>
              {saveLabel}
            </Button>
          )}
          <Button variant="text" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResusableDetailsModal;