import React, { useState } from 'react';
import { AnimalDto, HistorialDto } from '../../models/AnimalDto';
import * as HistorialService from '../../services/HistorialService';
import HistorialModal from './modals/HistorialModal';

import useAnimalStore from '../../stores/AnimalStore';

interface HistorialProps {
  animal: AnimalDto;
  onHistorialClose: () => void;
}

const Historial: React.FC<HistorialProps> = ({ animal, onHistorialClose }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const onModalClose = () => {
    setModalOpen(false);
    onHistorialClose();
  };

  const handleSave = async (historial: HistorialDto) => {
    if (historial.id) {
      await HistorialService.updateHistorial(animal.id, historial);
    } else {
      await HistorialService.addHistorial(animal.id, historial);
    }
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  const handleDelete = async (id: number) => {
    await HistorialService.deleteHistorial(animal.id, id);
    useAnimalStore.getState().fetchAnimalById(animal.id, true);
  };

  return (
    <>
      <HistorialModal
        open={modalOpen}
        onClose={onModalClose}
        onSave={handleSave}
        onDelete={handleDelete}
        name={animal.nombre}
        historialList={animal.historial || []}
      />
    </>
  );
};

export default Historial;