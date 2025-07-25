import React, { useState, useEffect } from 'react';
import { Modal, Typography, Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, IconButton, Button } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from 'date-fns/locale';
import CloseIcon from '@mui/icons-material/Close';

import { AnimalDto, initialAnimal } from '../../models/AnimalDto';
import { sexoOptions, estadoOptions, localizacionGatosOptions, localizacionPerrosOptions } from '../../constants/animalOptions';
import ListadoChips from '../shared/ListadoChips';

interface AltaAnimalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (animal: AnimalDto) => void;
  type: string;
  saving?: boolean;
  error?: string | null;
}

const AltaAnimalModal: React.FC<AltaAnimalModalProps> = ({ open, onClose, onSave, type, saving, error }) => {
  const [tempAnimal, setTempAnimal] = useState<AnimalDto>(initialAnimal);
  const [validationError, setValidationError] = useState<string | null>(null);
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

  const handleDateChange = (field: keyof AnimalDto) => (newDate: Date | null) => {
    handleChange(field, newDate ? newDate.toISOString().split('T')[0] : '');
  };

  const handleFechaEntradaChange = handleDateChange('fechaEntrada');
  const handleFechaNacimientoChange = handleDateChange('fechaNacimiento');
  const handleFechaEstadoChange = handleDateChange('fechaEstado');
  const handleFechaLocalizacionChange = handleDateChange('fechaLocalizacion');

  const handleSave = () => {
    if (!tempAnimal.sexo || !tempAnimal.estado || !tempAnimal.localizacion) {
      setValidationError("Por favor, seleccione el sexo, estado y localizacion para realizar un alta correctamente.");
      return;
    }
    onSave(tempAnimal);
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
          <Grid container spacing={3}>

            {/* Nombre - Entrada - Edad */}
            <Grid size={4}>
              <TextField label="Nombre" name="nombre" sx={{ width: 250 }}
                value={tempAnimal.nombre} onChange={e => handleChange('nombre', e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <DatePicker
                label="Fecha de entrada"
                value={tempAnimal.fechaEntrada ? new Date(tempAnimal.fechaEntrada) : null}
                onChange={handleFechaEntradaChange}
                sx={{ width: 250 }}
              />
            </Grid>
            <Grid size={4}>
              <DatePicker
                label="Fecha de nacimiento"
                value={tempAnimal.fechaNacimiento ? new Date(tempAnimal.fechaNacimiento) : null}
                onChange={handleFechaNacimientoChange}
                sx={{ width: 250 }}
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
              <DatePicker
                label="Fecha de estado"
                value={tempAnimal.fechaEstado ? new Date(tempAnimal.fechaEstado) : null}
                onChange={handleFechaEstadoChange}
                sx={{ width: 250 }}
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
                  value={tempAnimal.localizacion}
                  onChange={e => handleChange('localizacion', e.target.value)}
                >
                  {(isGato ? localizacionGatosOptions : localizacionPerrosOptions).map(opt => (
                    <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <DatePicker
                label="Fecha de localización"
                value={tempAnimal.fechaLocalizacion ? new Date(tempAnimal.fechaLocalizacion) : null}
                onChange={handleFechaLocalizacionChange}
                sx={{ width: 250 }}
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
    </LocalizationProvider>
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
        {(error || validationError) && (
          <Typography color="error" sx={{ mt: 2 }}>
            {validationError || error}
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