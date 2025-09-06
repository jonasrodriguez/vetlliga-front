import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import formatMonthDate from '../../utils/formatMonthDate';
import { estadoFiltroOptions } from '../../constants/animalOptions';

import { useAnimalFilterStore } from '../../stores/AnimalFilterStore';
import useConfigStore from '../../stores/ConfigStore';

const FiltrosDescripcion: React.FC = () => {

  const { filters, removeFilter } = useAnimalFilterStore();
  const { config } = useConfigStore();

  const [filterList, setFilterList] = useState<{ label: string; value: string; }[]>([]);
  const isGatos = filters.tipo === 'G';

  useEffect(() => {
    const newFilterList: { label: string; value: string; }[] = [];

    if (filters.estado !== undefined) {
      newFilterList.push({ 
        label: 'estado', 
        value: `Estado: ${estadoFiltroOptions[filters.estado].label}` });
    }    
    if (filters.fechaEstado) {
      newFilterList.push({ 
        label: 'fechaEstado', 
        value: `Fecha estado: ${formatMonthDate(filters.fechaEstado)}` });
    }
    if (filters.localizacion !== undefined) {
      const loc = config?.localizaciones?.find(l => l.id === filters.localizacion);
      newFilterList.push({ 
        label: 'localizacion', 
        value: `Localización: ${loc?.nombre}` 
      });
    }
    if (filters.fechaLocalizacion) {
      newFilterList.push({
        label: 'fechaLocalizacion',
        value: `Fecha localización: ${formatMonthDate(filters.fechaLocalizacion)}`
      });
    }
    if (filters.vacunaDesde || filters.vacunaHasta) {
      newFilterList.push({
        label: 'vacunaDesde;vacunaHasta',
        value: 'Ultima vacunación'
      });
    }
    if (filters.desparasitoInternaDesde || filters.desparasitoInternaHasta) {
      newFilterList.push({
        label: 'desparasitoInternaDesde;desparasitoInternaHasta',
        value: 'Ultima desparasitación interna'
      });
    }
    if (filters.desparasitoExternaDesde || filters.desparasitoExternaHasta) {
      newFilterList.push({
        label: 'desparasitoExternaDesde;desparasitoExternaHasta',
        value: 'Ultima desparasitación externa'
      });
    }
    if (filters.testDesde || filters.testHasta) {
      newFilterList.push({
        label: 'testDesde',
        value: 'Ultimo test'
      });
    }

    setFilterList(newFilterList);
  }, [filters, isGatos]);

  const handleDelete = (filter: { label: string; value: string }) => {
    setFilterList((prev) => prev.filter(f => f.label !== filter.label));
    const filterKeys = filter.label.split(';');
    filterKeys.forEach(key => removeFilter(key as keyof typeof filters));
  };

  if (filterList.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, gap: 2 }}>
      <Typography variant="subtitle1" color="textSecondary">
        Filtros activos:
      </Typography>  
      {filterList.map((filter) => (
        <Chip key={filter.label} label={filter.value} variant="outlined" onDelete={() => handleDelete(filter)} />
      ))}
    </Box>
  );
};

export default FiltrosDescripcion;