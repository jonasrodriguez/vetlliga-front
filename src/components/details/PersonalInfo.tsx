import { useState } from 'react';
import { Paper, Box, Avatar, TextField, Typography, Grid, Button, } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { AnimalDto } from '../../models/AnimalDto';
import SaveIcon from '@mui/icons-material/Save';

import { es } from 'date-fns/locale';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface PersonalInfoProps {
  animal: AnimalDto;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ animal }) => {
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const handleSave = () => {
    console.log(`Save logic here`);
    // Add your edit logic here
  };

  const PersonalInfoHeader: React.FC<{ animal: AnimalDto }> = ({ animal }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, gap: 3 }}>
      <Avatar sx={{ width: 150, height: 150 }} />
      <Typography variant="h6">{animal.nombre}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select labelId="estado-label" label="estado" defaultValue={0}>
            <MenuItem value={0}>En protectora</MenuItem>
            <MenuItem value={1}>En acogida</MenuItem>
            <MenuItem value={2}>Reservado</MenuItem>
            <MenuItem value={3}>Adoptado</MenuItem>
            <MenuItem value={4}>Fallecido</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1">el 10/04/2025</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="localizacion-label">Localizacion</InputLabel>
          <Select labelId="localizacion-label" label="localizacion" defaultValue={0}>
            <MenuItem value={0}>Adaptación</MenuItem>
            <MenuItem value={1}>Chiquipark</MenuItem>
            <MenuItem value={2}>Patio verde</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1">el 10/04/2025</Typography>
      </Box>
    </Box>
  );

  const PersonalInfoForm: React.FC<{ animal: AnimalDto }> = ({ animal }) => (
    <Box sx={{ width: 700 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField label="Nombre" name="name" value={animal.nombre} />
        </Grid>
        <Grid size={6}>
          <DatePicker
            label="Fecha de entrada"
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ width: 250 }}
          />
        </Grid>
        <Grid size={6}>
          <TextField label="Chip" name="name" value={animal.chip} sx={{ minWidth: 250 }} />
        </Grid>
        <Grid size={6}>
          <TextField label="Nº Registro" name="name" value={animal.numeroRegistro} sx={{ minWidth: 150 }}/>
        </Grid>
        <Grid size={6}>
          <DatePicker
              label="Fecha de nacimiento"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ width: 250 }}
            />
        </Grid>
        <Grid size={6}>
          <FormControl sx={{ minWidth: 250 }} >
            <InputLabel id="sexo-label">Sexo</InputLabel>
            <Select labelId="label" label="Sexo" defaultValue={0}>
              <MenuItem value={0}>Macho</MenuItem>
              <MenuItem value={1}>Hembra</MenuItem>
              <MenuItem value={2}>Desconocido</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <TextField label="Raza" name="name" />
        </Grid>
        <Grid size={6}>
          <TextField label="Color" name="name" />
        </Grid>
        <Grid size={6}>
          <TextField label="Origen" name="name" />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Enfermedades cronicas"
            multiline
            fullWidth
            rows={2}
          />
        </Grid>
      </Grid>    
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
      <Paper elevation={3} sx={{ p:4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
          <PersonalInfoHeader animal={animal} />
          <PersonalInfoForm animal={animal} />  
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