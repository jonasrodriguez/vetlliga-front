import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AnimalDto } from '../models/AnimalDto';
import { AnimalType } from '../models/AnimalType';
import { getEstadoAnimalFromRoute } from '../models/EstadoAnimal';
import { fetchAllAnimals } from '../services/AnimalService';
import AnimalListTable from '../components/list/AnimalListTable';
import AnimalListFiltros from '../components/list/AnimalListFiltros';

interface ListPageProps {
  type: AnimalType;
}

const AnimalListPage: React.FC<ListPageProps> = ({ type }) => {
  const { estado } = useParams<{ estado: string }>();
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<AnimalDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [statusMonth, setStatusMonth] = useState<string>(''); // For month filter
  const [statusYear, setStatusYear] = useState<string>(''); // For year filter
  const [sortField, setSortField] = useState<keyof AnimalDto | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const estadoEnum = estado ? getEstadoAnimalFromRoute(estado) : null;

  const criteria = useMemo(() => {
    return {
      tipo: type === AnimalType.GATOS ? 'G' : 'P',
      estado: estadoEnum ? estadoEnum : undefined,
      statusMonth: statusMonth || undefined,
      statusYear: statusYear || undefined,
    };
  }, [type, estadoEnum, statusMonth, statusYear]);

  useEffect(() => {
    const getAnimals = async () => {
      setLoading(true);
      try {
        const data = await fetchAllAnimals(criteria);
        setAnimals(data);
        setFilteredAnimals(data);
      } catch (err) {
        console.error('Error fetching animals:', err);
      } finally {
        setLoading(false);
      }
    };

    getAnimals();
  }, [criteria]);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = animals.filter((animal) =>
      animal.nombre.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredAnimals(filtered);
  }, [search, animals]);

  const handleSort = (field: keyof AnimalDto) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);

    const sorted = [...filteredAnimals].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? 1 : -1;
      if (a[field] > b[field]) return isAsc ? -1 : 1;
      return 0;
    });

    setFilteredAnimals(sorted);
  };

  const handleAddClick = () => {
    console.log('Añadir clicked');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <AnimalListFiltros
        type={type === AnimalType.GATOS ? 'Gatos' : 'Perros'}
        estadoEnum={estadoEnum}
        search={search}
        setSearch={setSearch}
        statusMonth={statusMonth}
        setStatusMonth={setStatusMonth}
        statusYear={statusYear}
        setStatusYear={setStatusYear}
        onAddClick={handleAddClick} // Pass the handler
      />
      <AnimalListTable
        animals={filteredAnimals}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        hideEstadoColumn={!!estado}
      />
    </Box>
  );
};

export default AnimalListPage;