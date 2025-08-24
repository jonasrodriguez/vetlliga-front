import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import useAnimalStore from '../stores/AnimalStore';
import DetalleLayout from '../layouts/DetalleLayout';

const DetallesAnimal = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();  
  const { animal, fetchAnimalById } = useAnimalStore();
  const initialHistorial = location.state?.initialHistorial ?? false;

  useEffect(() => {
    if (id) {
      fetchAnimalById(Number(id));
    }
  }, [id, fetchAnimalById]);

  if (!animal) {
    return <p>Loading...</p>;
  }

  return <DetalleLayout key={id} animal={animal} initialHistorial={initialHistorial} />;
};

export default DetallesAnimal;