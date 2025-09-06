import { useState } from 'react';
import { Paper, Box, TextField, Grid, Button, Chip, Typography, InputAdornment, IconButton } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { es } from 'date-fns/locale';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AnimalDto } from '../../models/AnimalDto';
import useAnimalStore from '../../stores/AnimalStore';
import { sexoOptions, estadoOptions } from '../../constants/animalOptions';

import useNotificationStore from '../../stores/NotificationStore';
import useConfigStore from '../../stores/ConfigStore';

interface PersonalInfoProps {
  animal: AnimalDto;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ animal }) => {
  const { updateAnimal } = useAnimalStore();
  const [tempAnimal, setTempAnimal] = useState<AnimalDto>({ ...animal });
  const [enfermedad, setEnfermedad] = useState('');
  const isGato = tempAnimal.tipo === 'GATO';

  const { localizacionesGato, localizacionesPerro } = useConfigStore();

  const enfermedades = tempAnimal.enfermedades != null ? tempAnimal.enfermedades.split(';') : [];

  const handleDateChange = (field: keyof AnimalDto) => (newDate: Date | null) => {
    handleChange(field, newDate ? newDate.toISOString().split('T')[0] : '');
  };

  const handleFechaEntradaChange = handleDateChange('fechaEntrada');
  const handleFechaNacimientoChange = handleDateChange('fechaNacimiento');
  const handleFechaEstadoChange = handleDateChange('fechaEstado');
  const handleFechaLocalizacionChange = handleDateChange('fechaLocalizacion');

  const handleChange = (key: keyof AnimalDto, value: string | number | null) => {
    setTempAnimal(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    updateAnimal(tempAnimal.id, tempAnimal);
    useNotificationStore.getState().show('Animal actualizado correctamente', 'success', 'bottom');
  };

  const handleDeleteEnfermedad = (index: number) => {
    const newEnfermedades = [...enfermedades];
    newEnfermedades.splice(index, 1);
    handleChange('enfermedades', newEnfermedades.join(';'));
  };

  const handleAddEnfermedad = () => {
    const trimmed = enfermedad.trim();
    if (!trimmed) return;

    const current = tempAnimal.enfermedades || '';
    const updated =
      current.length > 0 ? `${current};${trimmed}` : trimmed;

    handleChange('enfermedades', updated);
    setEnfermedad('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
      <Paper elevation={3} sx={{ p:4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>          
          <Grid container spacing={3}>

            {/* Nombre - Fecha entrada - Fecha nacimiento */}
            <Grid size={4}>
              <TextField label="Nombre" name="name"  sx={{ width: 250 }}
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

            {/* Chip - Nº registro - Sexo */}
            <Grid size={4}>
              <TextField label="Chip" name="chip"  sx={{ minWidth: 250 }} 
                value={tempAnimal.chip} onChange={e => handleChange('chip', e.target.value)} 
              />
            </Grid>
            <Grid size={4}>
              <TextField label="Nº Registro" name="numeroRegistro" sx={{ minWidth: 250 }} 
                value={tempAnimal.numeroRegistro} onChange={e => handleChange('numeroRegistro', e.target.value)} 
              />
            </Grid>
            <Grid size={4}>
              <FormControl sx={{ width: 250 }} >
                <InputLabel id="sexo-label">Sexo</InputLabel>
                <Select labelId="label" label="Sexo" defaultValue={tempAnimal.sexo} onChange={e => handleChange('sexo', e.target.value)}>
                  {sexoOptions.map(opt => (
                    <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Raza - Color - Origen */}
            <Grid size={4}>
              <TextField label="Raza"  name="raza" sx={{ width: 250 }} 
                value={tempAnimal.raza} onChange={e => handleChange('raza', e.target.value)} 
              />
            </Grid>
            <Grid size={4}>
              <TextField label="Color"  name="color" sx={{ width: 250 }} 
                value={tempAnimal.color} onChange={e => handleChange('color', e.target.value)} 
              />
            </Grid>
            <Grid size={4}>
              <TextField label="Origen"  name="origen" sx={{ width: 250 }} 
                value={tempAnimal.origen} onChange={e => handleChange('origen', e.target.value)} 
              />
            </Grid>

            {/* Estado - Fecha estado */}
            <Grid size={4}>
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="cambiar-estado-label" sx={{ color: 'primary.main' }}>Cambiar estado</InputLabel>
                <Select
                  labelId="cambiar-estado-label"
                  label="Cambiar estado"
                  value={tempAnimal.estado}
                  onChange={e => handleChange('estado', e.target.value)}
                  sx={{
                    color: 'primary.main',
                    '& .MuiSelect-icon': { color: 'primary.main' },
                    '& fieldset': { borderColor: 'primary.main' }
                  }}
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
                sx={{ width: 250,  
                  color: 'primary.main', 
                  '& fieldset': { borderColor: 'primary.main' } 
                }}
                slotProps={{
                  textField: {
                    InputLabelProps: {
                      sx: {
                        color: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={4} />

            {/* Localizacion - Fecha localizacion */}
            <Grid size={4}>
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="cambiar-localizacion-label" sx={{ color: 'success.main' }}>Cambiar localización</InputLabel>
                <Select
                  labelId="cambiar-localizacion-label"
                  label="Cambiar localización"
                  value={tempAnimal.localizacion}
                  onChange={e => handleChange('localizacion', e.target.value)}
                  sx={{
                    color: 'success.main',
                    '& .MuiSelect-icon': { color: 'success.main' },
                    '& fieldset': { borderColor: 'success.main' }
                  }}              
                >
                  {(isGato ? localizacionesGato : localizacionesPerro).map(opt => (
                    <MenuItem key={opt.id ?? '-'} value={opt.id}>{opt.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <DatePicker
                label="Fecha de localización"
                value={tempAnimal.fechaLocalizacion ? new Date(tempAnimal.fechaLocalizacion) : null}
                onChange={handleFechaLocalizacionChange}
                sx={{ width: 250,  
                  color: 'success.main', 
                  '& fieldset': { borderColor: 'success.main' } 
                }}
                slotProps={{
                  textField: {
                    InputLabelProps: {
                      sx: {
                        color: 'success.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={4} />            

            {/* Enfermedades cronicas */}
            <Grid size={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 2 }}>
                <Typography>
                  Enfermedades cronicas
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  {enfermedades
                    .filter((v) => v && v.trim?.() !== "")
                    .map((enfermedad, index) => (
                      <Chip key={index} label={enfermedad} onDelete={() => handleDeleteEnfermedad(index)} />
                  ))}
                  <Box sx={{ flexGrow: 1 }} />
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Agregar enfermedad"
                    value={enfermedad}
                    onChange={(e) => setEnfermedad(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={handleAddEnfermedad}>
                            <SaveIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>            
            </Grid>

            {/* Antecedentes */}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Guardar cambios
          </Button>
        </Box>    
      </Paper>
    </LocalizationProvider>
  );
};

export default PersonalInfo;