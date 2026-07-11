import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import AvatarCropper from './AvatarCropper';

interface AvatarModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (avatar: Blob) => void;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
};

const AvatarModal: React.FC<AvatarModalProps> = ({ open, loading, onClose, onSave }) => {

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">Cambiar Avatar</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <AvatarCropper onSave={onSave} loading={loading} />
        </Box>
      </Box>
    </Modal>
  );
};

export default AvatarModal;