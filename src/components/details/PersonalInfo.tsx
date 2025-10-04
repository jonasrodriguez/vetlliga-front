import { useState } from 'react';
import { Paper, Box, TextField, Grid, Button, Chip, Typography, InputAdornment, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { AnimalDto } from '../../models/AnimalDto';
import useAnimalStore from '../../stores/AnimalStore';
import { sexoOptions, estadoOptions } from '../../constants/animalOptions';
import AnimalDatePicker from '../shared/AnimalDatePicker';
import AnimalComboBox from '../shared/AnimalComboBox';

import useNotificationStore from '../../stores/NotificationStore';
import useConfigStore from '../../stores/ConfigStore';
import { useAuthStore } from '../../stores/AuthStore';

interface PersonalInfoProps {
  animal: AnimalDto;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ animal }) => {
  const { updateAnimal } = useAnimalStore();
  const [tempAnimal, setTempAnimal] = useState<AnimalDto>({ ...animal });
  const [enfermedad, setEnfermedad] = useState('');
  const isGato = tempAnimal.tipo === 'GATO';
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const { localizacionesGato, localizacionesPerro } = useConfigStore();
  const opttionsGato = localizacionesGato.map(loc => ({ label: loc.nombre, value: loc.id }));
  const optionsPerro = localizacionesPerro.map(loc => ({ label: loc.nombre, value: loc.id }));

  const enfermedades = tempAnimal.enfermedades != null ? tempAnimal.enfermedades.split(';') : [];

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
            <AnimalComboBox 
              label="Sexo" 
              value={tempAnimal.sexo} 
              options={sexoOptions}
              onChange={value => handleChange('sexo', value)}
            />
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
            <AnimalComboBox 
              label="Estado" 
              value={tempAnimal.estado} 
              options={estadoOptions}
              onChange={value => handleChange('estado', value)}
              color="blue"
            />
          </Grid>
          <Grid size={4}>
            <AnimalDatePicker
              label="Fecha de estado"
              value={tempAnimal.fechaEstado}
              onChange={(newDate) => handleChange("fechaEstado", newDate)}
              color="blue"
            />
          </Grid>
          <Grid size={4} />

          {/* Localizacion - Fecha localizacion */}
          <Grid size={4}>
            <AnimalComboBox 
              label="Localización" 
              value={tempAnimal.localizacion} 
              options={isGato ? opttionsGato : optionsPerro}
              onChange={value => handleChange('localizacion', value)}
              color="green"
            />            
          </Grid>
          <Grid size={4}>
            <AnimalDatePicker
              label="Fecha de localización"
              value={tempAnimal.fechaLocalizacion}
              onChange={(newDate) => handleChange("fechaLocalizacion", newDate)}
              color="green"
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
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={!isAdmin}>
          Guardar cambios
        </Button>
      </Box>    
    </Paper>
  );
};

export default PersonalInfo;