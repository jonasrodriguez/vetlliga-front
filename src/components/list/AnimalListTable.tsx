import React from 'react';
import { Table, TableBody, TableContainer, Paper, TableRow, TableCell } from '@mui/material';
import { AnimalDto } from '../../models/AnimalDto';
import AnimalTableHeaders from './AnimalTableHeaders';
import EstadoChip from '../shared/EstadoChip';

interface AnimalListTableProps {
  animals: AnimalDto[];
  sortField: keyof AnimalDto | null;
  sortDirection: 'asc' | 'desc';
  hideEstadoColumn?: boolean;
  onSort: (field: keyof AnimalDto) => void;
}

const AnimalListTable: React.FC<AnimalListTableProps> = ({ animals, sortField, sortDirection, onSort, hideEstadoColumn = false, }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <AnimalTableHeaders sortField={sortField} sortDirection={sortDirection} onSort={onSort} hideEstadoColumn={hideEstadoColumn} />
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell>{animal.nombre}</TableCell>
              {!hideEstadoColumn && (
                <TableCell>
                  <EstadoChip estado={animal.estado} />
                </TableCell>
              )}
              <TableCell>{animal.numeroRegistro}</TableCell>
              <TableCell>{animal.sexoDescripcion}</TableCell>
              <TableCell>{animal.chip}</TableCell>
              <TableCell>{animal.edad}</TableCell>
              <TableCell>{animal.fechaEntrada}</TableCell>
              <TableCell>{animal.enfermedadesCronicas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnimalListTable;