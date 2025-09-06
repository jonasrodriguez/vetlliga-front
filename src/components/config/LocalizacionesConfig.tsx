import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, IconButton, Button, TextField, Divider } from '@mui/material';
import { Save, Delete } from '@mui/icons-material';

import { AnimalType, getAnimalType, getAnimalTypeLabel } from '../../enums/AnimalType';
import { Localizacion } from '../../models/Localizacion';
import { addLocalizacion, deleteLocalizacion } from '../../services/ConfigService';

import useConfigStore from '../../stores/ConfigStore';
import useNotificationStore from '../../stores/NotificationStore';

interface LocalizacionesConfigProps {
  type: AnimalType;
}

const LocalizacionesConfig: React.FC<LocalizacionesConfigProps> = ({ type }) => {
  const { localizacionesGato, localizacionesPerro, fetchConfig } = useConfigStore();
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  const localizaciones: Localizacion[] = type === AnimalType.GATOS ? localizacionesGato : localizacionesPerro;
  const tipoAnimal = getAnimalTypeLabel(type);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    addLocalizacion(newName.trim(), getAnimalType(type))
      .then(() => {
        setNewName('');
        fetchConfig();
      })
      .catch(() => {
        useNotificationStore.getState().show('Error al añadir la localización', 'error', 'bottom');
      })
      .finally(() => setSaving(false));
  };

  const handleDelete = async (id: number) => {
    setSaving(true);
    deleteLocalizacion(id)
      .then(() => {
        fetchConfig();
      })
      .catch(() => {
        useNotificationStore.getState().show('Error al eliminar la localización: Comprueba que no esté en uso', 'error', 'bottom');
      })
      .finally(() => setSaving(false));
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 4, gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Localizaciones {tipoAnimal}
      </Typography>
      <Divider />
      {localizaciones.map((loc) => (
        <Grid container spacing={2} key={loc.id} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
          <Grid size={10}>
            <Typography variant="body2">{loc.nombre}</Typography>
          </Grid>
          <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => handleDelete(loc.id)} size="small" disabled={saving}>
              <Delete fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label={"Nueva localización " + tipoAnimal}
          value={newName}
          onChange={e => setNewName(e.target.value)}
          sx={{ minWidth: 500, flex: 2 }}
        />
        <Button variant="contained" startIcon={<Save />} onClick={handleAdd} disabled={saving} sx={{ flex: 1 }}>
          Añadir
        </Button>
      </Box>
    </Paper>
  );
};

export default LocalizacionesConfig;