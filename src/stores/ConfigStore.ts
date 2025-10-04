import { create } from 'zustand';
import { Config } from '../models/Config';
import { fetchAppConfig } from '../services/ConfigService';

interface ConfigState {
  config: Config | null;
  localizacionesGato: {label: string; value: number}[];
  localizacionesPerro: {label: string; value: number}[];
  fetchConfig: () => Promise<void>;
}

const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  localizacionesGato: [],
  localizacionesPerro: [],
  fetchConfig: async () => {
    const cfg = await fetchAppConfig();
    set({ 
      config: cfg,
      localizacionesGato: cfg.localizaciones.filter(l => l.tipo === 'GATO').map(loc => ({ label: loc.nombre, value: loc.id })),
      localizacionesPerro: cfg.localizaciones.filter(l => l.tipo === 'PERRO').map(loc => ({ label: loc.nombre, value: loc.id })),
    });
  },
}));

export default useConfigStore;