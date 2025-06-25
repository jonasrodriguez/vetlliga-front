import React from 'react';
import { TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { AnimalDto } from '../../models/AnimalDto';
import { useAnimalFilterStore } from '../../stores/AnimalFilterStore';

const AnimalTableHeaders: React.FC = () => {
  const { filters, setFilter } = useAnimalFilterStore();

  const handleSort = (field: keyof AnimalDto) => {
    const currentDirection = filters.sortDirection === 'asc' ? 'desc' : 'asc';
    setFilter('sortBy', field);
    setFilter('sortDirection', currentDirection);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'nombre'}        
            direction={filters.sortBy === 'nombre' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('nombre')}
          >
            Nombre
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'estado'}
            direction={filters.sortBy === 'estado' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('estado')}
          >
            Estado
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'numeroRegistro'}
            direction={filters.sortBy === 'numeroRegistro' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('numeroRegistro')}
          >
            Núm registro
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'sexo'}
            direction={filters.sortBy === 'sexo' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('sexo')}
          >
            Sexo
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'chip'}
            direction={filters.sortBy === 'chip' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('chip')}
          >
            Chip
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'fechaNacimiento'}
            direction={filters.sortBy === 'fechaNacimiento' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('fechaNacimiento')}
          >
            Edad
          </TableSortLabel>
        </TableCell>
        <TableCell>
          Peso
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={filters.sortBy === 'fechaEntrada'}
            direction={filters.sortBy === 'fechaEntrada' ? filters.sortDirection : 'asc'}
            onClick={() => handleSort('fechaEntrada')}
          >
            Entrada
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel>
            Enfermedad crónica
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default AnimalTableHeaders;