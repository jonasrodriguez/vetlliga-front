import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AnimalType } from '../enums/AnimalType';
import { getEstadoAnimalFromRoute } from '../enums/EstadoAnimal';

import AnimalListTable from '../components/list/AnimalListTable';
import AnimalListControles from '../components/list/AnimalListControles';
import AltaAnimalModal from '../components/list/AltaAnimalModal';
import AnimalListPagination from '../components/list/AnimalListPagination';
import useAnimalStore from '../stores/AnimalStore';
import { useAnimalFilterStore } from "../stores/AnimalFilterStore";
import animalCsv from '../utils/animalCsv';

import { useNavigate } from 'react-router-dom';
import FiltrosDescripcion from '../components/list/FiltrosDescripcion';

interface ListPageProps {
  type: AnimalType;
}

const AnimalListPage: React.FC<ListPageProps> = ({ type }) => {
  const { estado } = useParams<{ estado: string }>();
  const estadoEnum = estado ? getEstadoAnimalFromRoute(estado) : null;

  const { filters, setFilter, resetFilters } = useAnimalFilterStore();
  const { animalList, page, fetchAllAnimals } = useAnimalStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const tipoAnimal = type === AnimalType.GATOS ? 'Gatos' : 'Perros';

  useEffect(() => {
    if (type !== filters.tipo) {
      resetFilters();
    }
  }, [filters, type, resetFilters]);

  useEffect(() => {
    setFilter('tipo', type.toString());
    if (estadoEnum) {
      setFilter('estado', estadoEnum.toString());
    }
  }, [estadoEnum, type, setFilter]);

  useEffect(() => {
    if (!filters.tipo) return;
    setLoading(true);
    fetchAllAnimals(filters)
      .finally(() => setLoading(false));
  }, [filters, fetchAllAnimals]);

  const handleAddClick = () => {
    setModalOpen(true);
  };

  const onAnimalAlta = (id: number) => {
    setModalOpen(false);
    navigate(`/ficha/${id}`);
  }

  const handleExcelClick = () => {
    animalCsv(animalList);
  }

  const onPageChange = (newPage: number) => {
    setFilter('page', newPage);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Listado {tipoAnimal} 
      </Typography>
      <AnimalListControles type={type} onAddClick={handleAddClick} onExcelClick={handleExcelClick} />
      <FiltrosDescripcion />
      <AnimalListTable animals={animalList} />
      {page && <AnimalListPagination type={type} animalList={animalList} page={page} onPageChange={onPageChange} />}
      <AltaAnimalModal
        open={modalOpen}
        type={type}
        onClose={() => setModalOpen(false)}
        onAlta={onAnimalAlta}
      />
    </Box>
  );
};

export default AnimalListPage;