import { create } from "zustand";
import { AnimalCriteria } from "../models/AnimalCriteria";

interface AnimalFilterStore {
  filters: AnimalCriteria;
  setFilter: (key: keyof AnimalCriteria, value: number | string | undefined) => void;
  setFilters: (filters: AnimalCriteria) => void;
  removeFilter: (key: keyof AnimalCriteria) => void;
  resetFilters: () => void;
}

const initialFilters: AnimalCriteria = {
  sortBy: "fechaEntrada",
  sortDirection: "desc",
  page: 0,
  pageSize: 25,
};


const setFilter = (key: keyof AnimalCriteria, value: number | string | undefined) => {
  useAnimalFilterStore.setState((state) => ({
    filters: { ...state.filters, [key]: value },
  }));
};

const setFilters = (filters: AnimalCriteria) => {
  useAnimalFilterStore.setState({ filters });
};

const removeFilter = (key: keyof AnimalCriteria) => {
  useAnimalFilterStore.setState((state) => {
    const newFilters = { ...state.filters };
    delete newFilters[key];
    return { filters: newFilters };
  });
};

const resetFilters = () => {
  useAnimalFilterStore.setState((state) => ({
    filters: { ...initialFilters, tipo: state.filters.tipo },
  }));
}

export const useAnimalFilterStore = create<AnimalFilterStore>(() => ({
  filters: initialFilters,
  setFilter: setFilter,
  setFilters: setFilters,
  removeFilter: removeFilter,
  resetFilters: resetFilters,
}));

