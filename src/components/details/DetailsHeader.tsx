import React, { useState, useEffect, useRef } from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

import AvatarModal from './modals/AvatarModal';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import LazyAvatar from '../shared/LazyAvatar';

import { AnimalDto } from '@/models/AnimalDto';
import EstadoChip from '../shared/EstadoChip';
import LocalizacionChip from '../shared/LocalizacionChip';
import formatDate from '@/utils/formatDate';
import calculoEdad from '@/utils/calculoEdad';
import { sexoLiterales } from '@/enums/SexoAnimal';

import * as animalService from '@/services/AnimalService';
import * as avatarService from '@/services/AvatarService';

import { useAuthStore } from '@/stores/AuthStore';
import useNotificationStore from '@/stores/NotificationStore';

interface PersonalInfoProps {
  animal: AnimalDto;
}

const DetailsHeader: React.FC<PersonalInfoProps> = ({ animal }) => {
  const [deletion, setDeletion] = useState<boolean>(false);
  const [avatarSelector, setAvatarSelector] = useState<boolean>(false);
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);
  const [avatarImagePath, setAvatarImagePath] = useState<string | null>(null);

  const navigate = useNavigate();
  const edad = calculoEdad(animal.fechaNacimiento);
  const Sexo = sexoLiterales(animal.sexo);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const isGato = animal.tipo === 'GATO';

  const currentAvatarUrl = useRef<string | undefined>(undefined);

  useEffect(() => {
    console.log('avatar effect running for', animal.id, isGato, Math.random());
    const loadAvatar = async () => {
      const url = await avatarService.getAvatar(animal.id, isGato);
      if (currentAvatarUrl.current) window.URL.revokeObjectURL(currentAvatarUrl.current);
      if (url.startsWith('blob:')) currentAvatarUrl.current = url;
      setAvatarImagePath(url);
    };

    loadAvatar();
    return () => {
      if (currentAvatarUrl.current) {
        window.URL.revokeObjectURL(currentAvatarUrl.current);
        currentAvatarUrl.current = undefined;
      }
    };
  }, [animal.id, isGato]);

  const handleDeleteClick = () => setDeletion(true);
  const handleCancelDelete = () => setDeletion(false);
    const handleConfirmDelete = () => {
    setDeletion(false);
    animalService.disableAnimal(animal.id);
    navigate(-1);
  };

  const handleAvatarOnSave = (avatar: Blob) => {
    setAvatarLoading(true);
    avatarService.uploadAvatar(animal.id, avatar)
    .then(() => avatarService.getAvatar(animal.id, isGato))
    .then((url) => { setAvatarImagePath(url); })
    .catch((error) => {
      console.error("Error uploading avatar:", error);
      useNotificationStore.getState().show('Error al subir el avatar', 'error', 'bottom');
    }).finally(() => {
      setAvatarSelector(false);
      setAvatarLoading(false);
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', gap: 3 }}>
      <LazyAvatar src={avatarImagePath} onClick={() => setAvatarSelector(true)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', flexGrow: 1, gap: 1 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box onClick={() => navigate(-1)}  sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', cursor: 'pointer', width: 'fit-content' }}>
            <ArrowBackIosIcon fontSize="small" />
            <Typography variant="body2">Volver al listado</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
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
            disabled={!isAdmin}
          >
            Borrar
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h5">{animal.nombre}</Typography>
        <Typography variant="subtitle1">{animal.tipo == 'PERRO' ? 'Perro' : 'Gato'} | {Sexo} | {edad}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EstadoChip estado={animal.estado} />
          <Typography variant="subtitle1">
            desde el {formatDate(animal.fechaEstado)} | 
          </Typography>
          <LocalizacionChip localizacion={animal.localizacion} />
          <Typography variant="subtitle1">
            desde el {formatDate(animal.fechaLocalizacion)}
          </Typography>
        </Box>
      </Box>

      <AvatarModal
        open={avatarSelector}
        onClose={() => setAvatarSelector(false)}
        onSave={handleAvatarOnSave}
        loading={avatarLoading}
      />
      <DeleteConfirmation
        subtitle={`La ficha de ${animal.nombre} será borrada de forma permanente.`}
        confirmOpen={deletion}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Paper>
  );
};

export default DetailsHeader;