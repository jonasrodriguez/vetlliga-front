import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import useAnimalStore from '../stores/AnimalStore';
import DetalleLayout from '../layouts/DetalleLayout';

const DetallesAnimal = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();  
  const { animal, fetchAnimalById } = useAnimalStore();
  const initialHistorial = location.state?.initialHistorial ?? false;
  const [historial, setHistorial] = useState(initialHistorial);
  const [tabIndex, setTabIndex] = useState(historial ? 1 : 0);

  useEffect(() => {
    if (id) {
      fetchAnimalById(Number(id));
    }
  }, [id, fetchAnimalById]);

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  if (!animal) {
    return <p>Loading...</p>;
  }

  return <DetalleLayout key={id} animal={animal} tabIndex={tabIndex} onTabChange={handleTabChange} onHistorialClose={() => setHistorial(false)} />;
};

export default DetallesAnimal;