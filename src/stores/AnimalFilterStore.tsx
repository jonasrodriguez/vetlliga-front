import { create } from "zustand";

export interface AnimalFilterCriteria {
  tipo?: string;
  estado?: number;
  localizacion?: number;
  fechaLocalizacion?: string;
  fechaEstado?: string;

  ultimaVacunaDesde?: string;
  ultimaVacunaHasta?: string;
  ultimaParasitoDesde?: string;
  ultimaParasitoHasta?: string;
  ultimoTestDesde?: string;
  ultimoTestHasta?: string;

  search?: string;

  sortBy: string;
  sortDirection: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

interface AnimalFilterStore {
  filters: AnimalFilterCriteria;
  setFilter: (key: keyof AnimalFilterCriteria, value: number | string | undefined) => void;
  setFilters: (filters: AnimalFilterCriteria) => void;
  resetFilters: () => void;
}

const initialFilters: AnimalFilterCriteria = {
  sortBy: "fechaEntrada",
  sortDirection: "desc",
  page: 0,
  pageSize: 25,
};

export const useAnimalFilterStore = create<AnimalFilterStore>((set) => ({
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setFilters: (newFilters) => set(() => ({ filters: newFilters })),
  resetFilters: () =>
    set((state) => ({
      filters: { ...initialFilters, tipo: state.filters.tipo },
    })
  ),
}));
