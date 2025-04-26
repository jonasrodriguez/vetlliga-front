import React from 'react';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { AnimalDto } from '../../models/AnimalDto';

interface AnimalTableHeadersProps {
  sortField: keyof AnimalDto | null;
  sortDirection: 'asc' | 'desc';
  hideEstadoColumn?: boolean;
  onSort: (field: keyof AnimalDto) => void;
}

const AnimalTableHeaders: React.FC<AnimalTableHeadersProps> = ({ sortField, sortDirection, onSort, hideEstadoColumn = false }) => {
  return (
    <TableRow>
      <TableCell>
        <TableSortLabel
          active={sortField === 'nombre'}
          direction={sortField === 'nombre' ? sortDirection : 'asc'}
          onClick={() => onSort('nombre')}
        >
          Nombre
        </TableSortLabel>
      </TableCell>
      {!hideEstadoColumn && <TableCell>
        <TableSortLabel
          active={sortField === 'estado'}
          direction={sortField === 'estado' ? sortDirection : 'asc'}
          onClick={() => onSort('estado')}
        >
          Estado
        </TableSortLabel>
      </TableCell>}
      <TableCell>
        <TableSortLabel
          active={sortField === 'numeroRegistro'}
          direction={sortField === 'numeroRegistro' ? sortDirection : 'asc'}
          onClick={() => onSort('numeroRegistro')}
        >
          Núm registro
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={sortField === 'sexo'}
          direction={sortField === 'sexo' ? sortDirection : 'asc'}
          onClick={() => onSort('sexo')}
        >
          Sexo
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={sortField === 'chip'}
          direction={sortField === 'chip' ? sortDirection : 'asc'}
          onClick={() => onSort('chip')}
        >
          Chip
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={sortField === 'fechaNacimiento'}
          direction={sortField === 'fechaNacimiento' ? sortDirection : 'asc'}
          onClick={() => onSort('fechaNacimiento')}
        >
          Edad
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={sortField === 'fechaEntrada'}
          direction={sortField === 'fechaEntrada' ? sortDirection : 'asc'}
          onClick={() => onSort('fechaEntrada')}
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
  );
};

export default AnimalTableHeaders;