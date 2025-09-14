import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, IconButton, Divider, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

import DeleteConfirmation from '../shared/DeleteConfirmation';
import UsuarioModal from './modals/UsuarioModal';
import CambioPasswordModal from './modals/CambioPasswordModal';
import { Usuario } from '../../models/Usuario';
import { RolDisplay } from '../../enums/UsuarioRol';
import * as UserService from '../../services/UserService';
import useNotificationStore from '../../stores/NotificationStore';

const UsuariosConfig: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openUsuarioModal, setOpenUsuarioModal] = useState(false);
  const [openCambioPasswordModal, setOpenCambioPasswordModal] = useState(false);
  const [deletion, setDeletion] = useState<boolean>(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    UserService.fetchUsers()
      .then(setUsuarios)
      .catch((error) => {
        useNotificationStore.getState().show('Error al cargar los usuarios', 'error', 'bottom');
        console.error('Error fetching users:', error);
    });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, userId: number | undefined) => {
    if (!userId) {
      return;
    }

    setAnchor(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  // On add user

  const handleUserAdded = (user: Usuario) => {
    setOpenUsuarioModal(false);
    UserService.createUser(user)
      .then(() => {
        fetchUsuarios();
        useNotificationStore.getState().show(`Usuario ${user.username} añadido`, 'success', 'bottom');
      })
      .catch((error) => {
        useNotificationStore.getState().show('Error al añadir usuario', 'error', 'bottom');
        console.error('Error adding user:', error);
      });
  }

  // On change password

  const handleChangePassword = () => {
    setOpenCambioPasswordModal(true);    
  };

  const onPasswordChange = (newPassword: string) => {
    setOpenCambioPasswordModal(false);
    handleMenuClose();
    UserService.updateUserPassword(selectedUserId!, newPassword)
      .then(() => {
        useNotificationStore.getState().show('Contraseña cambiada', 'success', 'bottom');
      })
      .catch((error) => {
        useNotificationStore.getState().show('Error al cambiar la contraseña', 'error', 'bottom');
        console.error('Error changing password:', error);
      })
      .finally(() => setSelectedUserId(null));
  };


  // On delete user

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeletion(true);
  };

  const handleCancelDelete = () => setDeletion(false);

  const handleConfirmDelete = () => {
    setDeletion(false);
    UserService.deleteUser(selectedUserId!)
      .then(() => {
        useNotificationStore.getState().show('Usuario eliminado', 'success', 'bottom');
      })
      .catch((error) => {
        useNotificationStore.getState().show('Error al eliminar usuario', 'error', 'bottom');
        console.error('Error deleting user:', error);
      })
      .finally(() => {
        setSelectedUserId(null);
        fetchUsuarios();
      });
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 4, gap: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2 }}>
        <Typography variant="h6" gutterBottom>
          Usuarios
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenUsuarioModal(true)}>
          Nuevo Usuario
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', py: 1 }}>
        <Grid size={3}>
          <Typography variant="body2">Usuario</Typography>
        </Grid>        
        <Grid size={3}>
          <Typography variant="body2">Nombre</Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="body2">Apellidos</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="body2">Rol</Typography>
        </Grid>
        <Grid size={1} />
      </Grid>

      {usuarios.map((entry) => (
        <React.Fragment key={entry.id}>
          <Grid container spacing={2} key={entry.id} alignItems="center" >
            <Grid size={3} sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Typography variant="body2">{entry.username}</Typography>
            </Grid>
            <Grid size={3} sx={{ alignItems: 'center' }}>
              <Typography variant="body2">{entry.firstName}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="body2">{entry.lastName}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography variant="body2">{RolDisplay[entry.rol]}</Typography>
            </Grid>
            <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={(e) => handleMenuOpen(e, entry.id)} size="small">
                <MenuIcon fontSize="small" />
              </IconButton>
            </Grid>          
          </Grid>
          <Divider />
        </React.Fragment>
      ))}

      {/* Menu */}
      <Menu 
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleChangePassword}>Cambiar contraseña</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Eliminar usuario</MenuItem>
      </Menu>

      {/* Alta usuario modal */}
      <UsuarioModal
        open={openUsuarioModal}
        onClose={() => setOpenUsuarioModal(false)}
        onSubmit={handleUserAdded}
      />

      {/* Cambio password modal */}
      <CambioPasswordModal
        open={openCambioPasswordModal}
        onClose={() => setOpenCambioPasswordModal(false)}
        onSubmit={onPasswordChange}
      />

      {/* Delete confirmation modal */}
      <DeleteConfirmation
        subtitle={`El usuario será borrado de forma permanente.`}
        confirmOpen={deletion}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />

    </Paper>
  );
};

export default UsuariosConfig;