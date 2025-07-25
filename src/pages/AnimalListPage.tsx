import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Pagination , Stack, Typography } from '@mui/material';
import { AnimalType } from '../enums/AnimalType';
import { getEstadoAnimalFromRoute } from '../enums/EstadoAnimal';

import AnimalListTable from '../components/list/AnimalListTable';
import AnimalListControles from '../components/list/AnimalListControles';
import AltaAnimalModal from '../components/list/AltaAnimalModal';
import { AnimalDto } from '../models/AnimalDto';

import * as animalService from '../services/AnimalService';
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
  const { animals, fetchAllAnimals } = useAnimalStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleExcelClick = () => {
    animalCsv(animals);
  }

  const handleAltaAnimal = async (animal: AnimalDto) => {
    setSaving(true);
    setError(null);
    try {
      const response = await animalService.createAnimal(animal);
      navigate(`/ficha/${response.id}`);
      setModalOpen(false);
    } catch (e) {
      console.error("Error al guardar el animal:", e);
      setError("No se pudo guardar el animal. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
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
      <AnimalListTable animals={animals} />
      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>
      <AltaAnimalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAltaAnimal}
        type={type}
        saving={saving}
        error={error}
      />
    </Box>
  );
};

export default AnimalListPage;