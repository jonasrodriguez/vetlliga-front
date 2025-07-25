import { Paper, Box, Avatar, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

import { AnimalDto } from '../../models/AnimalDto';
import EstadoChip from '../shared/EstadoChip';
import LocalizacionChip from '../shared/LocalizacionChip';
import formatDate from '../../utils/formatDate';
import calculoEdad from '../../utils/calculoEdad';
import { sexoLiterales } from '../../enums/SexoAnimal';

interface PersonalInfoProps {
  animal: AnimalDto;
}

const DetailsHeader: React.FC<PersonalInfoProps> = ({ animal }) => {
  const navigate = useNavigate();
  const edad = calculoEdad(animal.fechaNacimiento);
  const Sexo = sexoLiterales(animal.sexo);

  const isGato = animal.tipo === 'GATO';
  const imageNum = animal.id % 5;
  
  const imagePath = isGato 
    ? `/avatars/gato${imageNum}.png` 
    : `/avatars/perro${imageNum}.png`;

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', gap: 3 }}>
      <Avatar src={imagePath} sx={{ width: 150, height: 150 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', flexGrow: 1, gap: 1 }}>
        <Box onClick={() => navigate(-1)}  sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', cursor: 'pointer', width: 'fit-content' }}>
          <ArrowBackIosIcon fontSize="small" />
          <Typography variant="body2">Volver al listado</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h5">{animal.nombre}</Typography>
        <Typography variant="subtitle1">{animal.tipo == 'PERRO' ? 'Perro' : 'Gato'} | {Sexo} | {edad}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EstadoChip estado={animal.estado} />
          <Typography variant="subtitle1">
            desde el {formatDate(animal.fechaEstado)} | 
          </Typography>
          <LocalizacionChip localizacion={animal.localizacion} tipo={animal.tipo} />
          <Typography variant="subtitle1">
            desde el {formatDate(animal.fechaLocalizacion)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DetailsHeader;