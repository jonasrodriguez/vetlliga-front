import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { Rol, RolDisplay } from '../../../enums/UsuarioRol';
import { Usuario, initialUsuario } from '../../../models/Usuario';

import useNotificationStore from '../../../stores/NotificationStore';

interface UsuarioModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Usuario) => void;
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState<Usuario>(initialUsuario);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleChange = (key: keyof Usuario, value: string | number | null) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.username) {
      useNotificationStore.getState().show('Por favor, rellena el campo de usuario', 'error', 'bottom');
      return;
    }    

    if (password.length < 8) {
      useNotificationStore.getState().show('La contraseña debe tener al menos 8 caracteres', 'error', 'bottom');
      return;
    }
    if (password !== repeatPassword) {
      useNotificationStore.getState().show('Las contraseñas no coinciden', 'error', 'bottom');
      return;
    }

    onSubmit({ ...form, password });
    setForm(initialUsuario);
    setPassword('');
    setRepeatPassword('');
    onClose();
  };

  const toggleRol = (
    <RadioGroup
      row
      value={form.rol}
      onChange={(e) => handleChange('rol', e.target.value as Rol)}
      sx ={{ ml: 2 }}
    >
      <FormControlLabel
        value={Rol.ADMIN}
        control={<Radio />}
        label={RolDisplay[Rol.ADMIN]}
      />
      <FormControlLabel
        value={Rol.USUARIO}
        control={<Radio />}
        label={RolDisplay[Rol.USUARIO]}
      />
    </RadioGroup>
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Grid container spacing={2}>

          <Grid size={6} sx={{ mt: 1 }}>
            <TextField 
              label="Usuario" 
              name="usuario" 
              sx={{ width: 250 }}
              value={form.username}
               onChange={e => handleChange('username', e.target.value)}
            />
          </Grid>
          <Grid size={6} sx={{ mt: 1 }}>
            <TextField 
              label="Email" 
              name="email" 
              sx={{ width: 250 }}
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </Grid>


          <Grid size={6}>
            <TextField 
              label="Nombre" 
              name="nombre" 
              sx={{ width: 250 }}
              value={form.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField 
              label="Apellidos" 
              name="apellidos" 
              sx={{ width: 250 }}
              value={form.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
            />
          </Grid>

          <Grid size={6}>
            <TextField 
              label="Contraseña" 
              name="contraseña" 
              sx={{ width: 250 }}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField 
              label="Repetir contraseña" 
              name="repetir_contraseña" 
              sx={{ width: 250 }}
              type="password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </Grid>  

          <Grid size={6} sx={{ mt: 1 }}>
            {toggleRol}
          </Grid>
          <Grid size={6} />

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add User</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UsuarioModal;