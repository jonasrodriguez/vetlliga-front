import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

import useNotificationStore from '../../../stores/NotificationStore';

interface CambioPasswordProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: string) => void;
}

const CambioPasswordModal: React.FC<CambioPasswordProps> = ({ open, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = () => {
    if (password.length < 8) {
      useNotificationStore.getState().show('La contraseña debe tener al menos 8 caracteres', 'error', 'bottom');
      return;
    }
    if (password !== repeatPassword) {
      useNotificationStore.getState().show('Las contraseñas no coinciden', 'error', 'bottom');
      return;
    }
    onSubmit(password);
    setPassword('');
    setRepeatPassword('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cambiar Contraseña</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label="Nueva Contraseña"
          name="nueva_contraseña"
          sx={{ width: 250, my: 1 }}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="Repetir Nueva Contraseña"
          name="repetir_nueva_contraseña"
          sx={{ width: 250 }}
          type="password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Change Password</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CambioPasswordModal;