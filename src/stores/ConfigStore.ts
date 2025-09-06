import { create } from 'zustand';
import { Config } from '../models/Config';
import { Localizacion } from '../models/Localizacion';
import { fetchAppConfig } from '../services/ConfigService';

interface ConfigState {
  config: Config | null;
  localizacionesGato: Localizacion[];
  localizacionesPerro: Localizacion[];
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
      localizacionesGato: cfg.localizaciones.filter(l => l.tipo === 'GATO'),
      localizacionesPerro: cfg.localizaciones.filter(l => l.tipo === 'PERRO'),
    });
  },
}));

export default useConfigStore;