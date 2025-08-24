import React, { useState } from 'react';
import { AnimalDto, HistorialDto } from '../../models/AnimalDto';
import * as HistorialService from '../../services/HistorialService';
import HistorialModal from './modals/HistorialModal';

interface HistorialProps {
  animal: AnimalDto;
  onHistorialClose: () => void;
}

const Historial: React.FC<HistorialProps> = ({ animal, onHistorialClose }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [historialList, setHistorialList] = useState<HistorialDto[]>(animal.historial || []);

  const onModalClose = () => {
    setModalOpen(false);
    onHistorialClose();
  };

  const handleSave = async (historial: HistorialDto) => {
    if (historial.id) {
      const update = await HistorialService.updateHistorial(animal.id, historial);
      setHistorialList((prev) => prev.map((h) => (h.id === update.id ? update : h)));

    } else {
      const newEntry = await HistorialService.addHistorial(animal.id, historial);
      setHistorialList((prev) => [newEntry, ...prev]);
    }
  };

  const handleDelete = async (id: number) => {
    await HistorialService.deleteHistorial(animal.id, id);
    setHistorialList((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <>
      <HistorialModal
        open={modalOpen}
        onClose={onModalClose}
        onSave={handleSave}
        onDelete={handleDelete}
        name={animal.nombre}
        historialList={historialList}
      />
    </>
  );
};

export default Historial;