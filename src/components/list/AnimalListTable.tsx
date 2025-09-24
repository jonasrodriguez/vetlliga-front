import React from 'react';
import { Table, TableBody, TableContainer, Paper, TableRow, TableCell, IconButton, Tooltip  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { AnimalDto } from '../../models/AnimalDto';
import AnimalTableHeaders from './AnimalTableHeaders';
import EstadoChip from '../shared/EstadoChip';
import LocalizacionChip from '../shared/LocalizacionChip';

import calculoEdad from '../../utils/calculoEdad';
import { sexoLiterales } from '../../enums/SexoAnimal';

import formatDate from '../../utils/formatDate';

interface AnimalListTableProps {
  animals: AnimalDto[];
}

const AnimalListTable: React.FC<AnimalListTableProps> = ({ animals }) => {

  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/ficha/${id}`);
  };

  const handleHistorialClick = (id: number) => {
    navigate(`/ficha/${id}`, { state: { initialHistorial: true } });
  };

  const listadoEnfermedades = (animal: AnimalDto) => {
    if (animal.enfermedades) {
      return animal.enfermedades.split(';');
    }
    return [];
  }

  return (
    <TableContainer component={Paper} elevation={5}>
      <Table>
        <AnimalTableHeaders/>
        <TableBody>
          {animals.map((animal, key) => (
            <TableRow key={animal.id} onClick={() => handleRowClick(animal.id)}
              sx={{
                cursor: 'pointer',
                backgroundColor: key % 2 === 0 ? 'rgba(0, 0, 0, 0.05)' : 'inherit', // Alternating row colors
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.15)', // Slightly darker background on hover
                },
              }}
            >
              <TableCell>{animal.nombre}</TableCell>
              <TableCell>
                <EstadoChip estado={animal.estado} />
              </TableCell>
              <TableCell>
                <LocalizacionChip localizacion={animal.localizacion} />
              </TableCell>                   
              <TableCell>{animal.numeroRegistro}</TableCell>
              <TableCell>{sexoLiterales(animal.sexo)}</TableCell>
              <TableCell>{animal.chip}</TableCell>
              <TableCell>{calculoEdad(animal.fechaNacimiento)}</TableCell>         
              <TableCell>{animal.ultimoPeso ? `${animal.ultimoPeso} kg` : '-'}</TableCell>
              <TableCell>{formatDate(animal.fechaEntrada)}</TableCell>
              <TableCell>{listadoEnfermedades(animal).join(', ')}</TableCell>

              {/* Boton historial */}
              <TableCell  onClick={(e) => e.stopPropagation()} >
                <Tooltip title="Mostrar historial">
                  <IconButton onClick={() => handleHistorialClick(animal.id)} size="small">
                    <SummarizeIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnimalListTable;