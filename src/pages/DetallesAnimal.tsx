import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAnimalStore from '../stores/AnimalStore';
import DetalleLayout from '../layouts/DetalleLayout';

const DetallesAnimal = () => {
  //const { id } = useParams<{ id: string }>();
  const id = 1;
  const { animal, fetchAnimalById } = useAnimalStore();

  useEffect(() => {
    if (id) {
      fetchAnimalById(Number(id));
    }
  }, [id, fetchAnimalById]);

  if (!animal) {
    return <p>Loading...</p>;
  }

  return <DetalleLayout animal={animal} />;
};

export default DetallesAnimal;