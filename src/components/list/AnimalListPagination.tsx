import React from 'react';
import { Pagination , Stack, Typography } from '@mui/material';
import { AnimalDto, Page } from '../../models/AnimalDto';
import { AnimalType } from '../../enums/AnimalType';

interface AnimalListPaginationProps {
  type: AnimalType;
  animalList: AnimalDto[];
  page: Page;
  onPageChange: (newPage: number) => void;
}

const AnimalListPagination: React.FC<AnimalListPaginationProps> = ({ page, animalList, type, onPageChange }) => {
  if (!page) return null;
  
  const tipoAnimal = type === AnimalType.GATOS ? 'Gatos' : 'Perros';
  const currentPage = page?.number + 1;
  const start = page.number * page.size + 1;
  const end = page.number * page.size + animalList.length;
  const total = page.totalElements;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const newPage = value - 1; // Server pagination starts at 0
    onPageChange(newPage);
  };

  return (
    <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
      <Typography variant="body2">
        Mostrando {start} a {end} de {total} {tipoAnimal}
      </Typography>
      <Pagination
        count={page?.totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default AnimalListPagination;