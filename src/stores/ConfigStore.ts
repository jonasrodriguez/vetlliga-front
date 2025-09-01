import { create } from 'zustand';
import { Config } from '../models/Config';
import { fetchAppConfig } from '../services/ConfigService';

interface ConfigState {
  config: Config | null;
  fetchConfig: () => Promise<void>;
  setConfig: (config: Config) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  fetchConfig: async () => {
    const cfg = await fetchAppConfig();
    set({ config: cfg });
  },
  setConfig: (config) => set({ config }),
}));

export default useConfigStore;