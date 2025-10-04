import React, { useState, useEffect } from 'react';
import { Modal, Typography, Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { AnimalDto, initialAnimal } from '../../models/AnimalDto';
import { sexoOptions, estadoOptions } from '../../constants/animalOptions';
import ListadoChips from '../shared/ListadoChips';
import AnimalDatePicker from '../shared/AnimalDatePicker';

import useAnimalStore from '../../stores/AnimalStore';
import useConfigStore from '../../stores/ConfigStore';

interface AltaAnimalModalProps {
  open: boolean;
  type: string;
  onClose: () => void;
  onAlta: (id: number) => void;
}

const AltaAnimalModal: React.FC<AltaAnimalModalProps> = ({ open, type, onClose, onAlta }) => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempAnimal, setTempAnimal] = useState<AnimalDto>(initialAnimal);
  const { addAnimal } = useAnimalStore();

  const { localizacionesGato, localizacionesPerro } = useConfigStore();

  const isGato = type === 'G';
  const enfermedades = tempAnimal.enfermedades.split(';');

  useEffect(() => {
    if (open) {
      setTempAnimal({
        ...initialAnimal,
        tipo: isGato ? "GATO" : "PERRO",
      });
    }
  }, [open, isGato]);

  const handleChange = (key: keyof AnimalDto, value: string | number | null) => {
    setTempAnimal(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    if (!tempAnimal.sexo || !tempAnimal.estado || !tempAnimal.localizacion) {
      setError("Por favor, seleccione el sexo, estado y localizacion para realizar un alta correctamente.");
      return;
    }
    await addAnimal(tempAnimal)
      .then((response) => onAlta(response.id))
      .catch(() => setError("No se pudo guardar el animal. Intenta nuevamente."))
      .finally(() => setSaving(false));
  };

  const handleClose = () => {
    onClose();
  };

  const handleDeleteEnfermedad = (index: number) => {
    const newEnfermedades = [...enfermedades];
    newEnfermedades.splice(index, 1);
    handleChange('enfermedades', newEnfermedades.join(';'));
  };

  const handleAddEnfermedad = (enfermedad: string) => {
    const trimmed = enfermedad.trim();
    if (!trimmed) return;

    const current = tempAnimal.enfermedades || '';
    const updated =
      current.length > 0 ? `${current};${trimmed}` : trimmed;

    handleChange('enfermedades', updated);
  };

  const content = (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
      <Grid container spacing={3}>

        {/* Nombre - Entrada - Edad */}
        <Grid size={4}>
          <TextField label="Nombre" name="nombre" sx={{ width: 250 }}
            value={tempAnimal.nombre} onChange={e => handleChange('nombre', e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <AnimalDatePicker
            label="Fecha de entrada"
            value={tempAnimal.fechaEntrada}
            onChange={(newDate) => handleChange("fechaEntrada", newDate)}
          />
        </Grid>
        <Grid size={4}>
          <AnimalDatePicker
            label="Fecha de nacimiento"
            value={tempAnimal.fechaNacimiento}
            onChange={(newDate) => handleChange("fechaNacimiento", newDate)}
          />
        </Grid>

        {/* Nº Registro - Chip - Sexo */}
        <Grid size={4}>
          <TextField label="Nº Registro" name="numeroRegistro" sx={{ minWidth: 250 }}
            value={tempAnimal.numeroRegistro} onChange={e => handleChange('numeroRegistro', e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField label="Nº Chip" name="chip" sx={{ minWidth: 250 }}
            value={tempAnimal.chip} onChange={e => handleChange('chip', e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <FormControl sx={{ width: 250 }} >
            <InputLabel id="sexo-label">Sexo</InputLabel>
            <Select
              labelId="sexo-label"
              label="Sexo"
              value={tempAnimal.sexo}
              onChange={e => handleChange('sexo', e.target.value)}
            >
              {sexoOptions.map(opt => (
                <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Raza - Color - Origen */}
        <Grid size={4}>
          <TextField label="Raza" name="raza" sx={{ width: 250 }}
            value={tempAnimal.raza} onChange={e => handleChange('raza', e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField label="Color" name="color" sx={{ width: 250 }}
            value={tempAnimal.color} onChange={e => handleChange('color', e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField label="Origen" name="origen" sx={{ width: 250 }}
            value={tempAnimal.origen} onChange={e => handleChange('origen', e.target.value)}
          />
        </Grid>

        {/* Estado */}
        <Grid size={4}>
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="cambiar-estado-label">Cambiar estado</InputLabel>
            <Select
              labelId="cambiar-estado-label"
              label="Cambiar estado"
              value={tempAnimal.estado}
              onChange={e => handleChange('estado', e.target.value)}
            >
              {estadoOptions.map(opt => (
                <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <AnimalDatePicker
            label="Fecha de estado"
            value={tempAnimal.fechaEstado}
            onChange={(newDate) => handleChange("fechaEstado", newDate)}
          />
        </Grid>
        <Grid size={4} />

        {/* Localizacion */}
        <Grid size={4}>
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="cambiar-localizacion-label">Cambiar localización</InputLabel>
            <Select
              labelId="cambiar-localizacion-label"
              label="Cambiar localización"
              value={
                (isGato ? localizacionesGato : localizacionesPerro)
                  .some(opt => opt.id === tempAnimal.localizacion)
                    ? tempAnimal.localizacion
                    : ''
              }
              onChange={e => handleChange('localizacion', e.target.value)}
            >
              {(isGato ? localizacionesGato : localizacionesPerro).map(opt => (
                <MenuItem key={opt.id ?? '-'} value={opt.id}>{opt.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <AnimalDatePicker
            label="Fecha de localización"
            value={tempAnimal.fechaLocalizacion}
            onChange={(newDate) => handleChange("fechaLocalizacion", newDate)}
          />
        </Grid>
        <Grid size={4} />

        <Grid size={12}>
          <ListadoChips
            title="Enfermedades crónicas"
            values={enfermedades}
            handleAddNewValue={handleAddEnfermedad}
            handleDeleteValue={handleDeleteEnfermedad}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            label="Antecedentes"
            multiline
            fullWidth
            rows={2}
            value={tempAnimal.antecedentes}
            onChange={e => handleChange('antecedentes', e.target.value)}
          />
        </Grid>
        
      </Grid>
    </Box>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Nueva Alta de {isGato ? "Gato" : "Perro"}</Typography>
          <IconButton aria-label="close" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {content}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {saving ? "Guardando..." : `Alta ${isGato ? "Gato" : "Perro"}`}
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}                 
            sx={{
              backgroundColor: (theme) => theme.palette.error.main,
                '&:hover': {
              backgroundColor: (theme) => theme.palette.error.dark,
                boxShadow: '0px 4px 20px 0px rgba(211,47,47,0.2)',
              },
          }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AltaAnimalModal;