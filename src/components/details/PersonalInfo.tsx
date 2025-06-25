import { useState } from 'react';
import { Paper, Box, TextField, Grid, Button } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { es } from 'date-fns/locale';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AnimalDto } from '../../models/AnimalDto';
import useAnimalStore from '../../stores/AnimalStore';
import { sexoOptions, estadoOptions, localizacionGatosOptions, localizacionPerrosOptions } from '../../constants/animalOptions';

interface PersonalInfoProps {
  animal: AnimalDto;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ animal }) => {
  const { updateAnimal } = useAnimalStore();

  const [tempAnimal, setTempAnimal] = useState<AnimalDto>({ ...animal });
  const isGato = tempAnimal.tipo === 'GATO';

  const handleFechaEntradaChange = (newDate: Date | null) => {
    handleChange('fechaEntrada', newDate ? newDate.toISOString().split('T')[0] : '');
  };

  const handleFechaNacimientoChange = (newDate: Date | null) => {
    handleChange('fechaNacimiento', newDate ? newDate.toISOString().split('T')[0] : '');
  };

  const handleChange = (key: keyof AnimalDto, value: string | number | null) => {
    setTempAnimal(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    updateAnimal(tempAnimal.id, tempAnimal);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
      <Paper elevation={3} sx={{ p:4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>          
          <Grid container spacing={3}>

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
                  {(isGato ? localizacionGatosOptions : localizacionPerrosOptions).map(opt => (
                    <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <TextField
                label="Enfermedades crónicas"
                multiline
                fullWidth
                rows={2}
                value={tempAnimal.enfermedadesCronicas}
                onChange={e => handleChange('enfermedadesCronicas', e.target.value)}
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