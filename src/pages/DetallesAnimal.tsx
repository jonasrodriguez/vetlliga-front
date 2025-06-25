import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import useAnimalStore from '../stores/AnimalStore';
import DetalleLayout from '../layouts/DetalleLayout';

const DetallesAnimal = () => {
  const { id } = useParams<{ id: string }>();  
  const { animal, fetchAnimalById } = useAnimalStore();
  const [openHistorial, setOpenHistorial] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tabHistorial = searchParams.get('historial');
    if (tabHistorial) {
      setOpenHistorial(true);
    }
  }, [searchParams]);


  useEffect(() => {
    if (id) {
      fetchAnimalById(Number(id));
    }
  }, [id, fetchAnimalById]);

  if (!animal) {
    return <p>Loading...</p>;
  }

  return <DetalleLayout animal={animal} openHistorial={openHistorial} />;
};

export default DetallesAnimal;