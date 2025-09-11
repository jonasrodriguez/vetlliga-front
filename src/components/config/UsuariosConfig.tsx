import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { Usuario } from '../../models/Usuario';

import { fetchUsers } from '../../services/UserService';
import useNotificationStore from '../../stores/NotificationStore';

const UsuariosConfig: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsuarios)
      .catch((error) => {
        useNotificationStore.getState().show('Error al cargar los usuarios', 'error', 'bottom');
        console.error('Error fetching users:', error);
    });
  }, []);

  return (
    <Paper elevation={3} sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 4, gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Usuarios
      </Typography>

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
        <Grid container spacing={2} key={entry.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={3}>
            <Typography variant="body2">{entry.username}</Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant="body2">{entry.firstName}</Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant="body2">{entry.lastName}</Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2">{entry.rol}</Typography>
          </Grid>
          <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => {}} size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Grid>          
        </Grid>
      ))}

    </Paper>
  );
};

export default UsuariosConfig;