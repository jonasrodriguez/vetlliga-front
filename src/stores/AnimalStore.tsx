import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AnimalDto } from '../models/AnimalDto';
import { fetchAnimal, fetchAllAnimals, updateAnimal, createAnimal } from '../services/AnimalService';
import { AnimalFilterCriteria } from './AnimalFilterStore'; 

interface AnimalStore {
  animal: AnimalDto | null;
  animals: AnimalDto[];
  filters: AnimalFilterCriteria;
  fetchAnimalById: (id: number, force?: boolean) => Promise<void>;
  fetchAllAnimals: (criteria: Partial<AnimalFilterCriteria>) => Promise<void>;
  updateAnimal: (id: number, updates: Partial<AnimalDto>) => Promise<void>;
  setFilters: (newFilters: Partial<AnimalFilterCriteria>) => void; 
}

const useAnimalStore = create<AnimalStore>()(
  devtools((set) => ({
    animal: null,
    animals: [],
    fetchAnimalById: async (id, force = false) => {
      const { animals, animal } = useAnimalStore.getState();

      if (!force) {
        // If the animal is already selected or exists in the list, set it without fetching
        const existingAnimal = animals.find((a) => a.id === id);
        if (existingAnimal) {
          set({ animal: existingAnimal });
          return;
        }
        if (animal?.id === id) {
          return;
        }
      }

      // Otherwise, fetch it from the API
      const fetchedAnimal = await fetchAnimal(id);
      set({ animal: fetchedAnimal });
    },
    fetchAllAnimals: async (criteria: Partial<AnimalFilterCriteria>) => {
      const animals = await fetchAllAnimals(criteria);
      set({ animals });
    },
    createAnimal: async (newAnimal: Omit<AnimalDto, 'id'>) => {
      const createdAnimal = await createAnimal(newAnimal);
      set((state) => ({
        animals: [...state.animals, createdAnimal],
      }));
    },
    updateAnimal: async (id, updates) => {
      const updatedAnimal = await updateAnimal(id, updates);
      set((state) => ({
        animals: state.animals.map((a) => (a.id === id ? updatedAnimal : a)),
        animal: state.animal?.id === id ? updatedAnimal : state.animal,
      }));
    },
  }))
);

export default useAnimalStore;