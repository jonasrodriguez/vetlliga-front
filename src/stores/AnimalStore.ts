import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AnimalDto } from '../models/AnimalDto';
import { fetchAnimal, fetchAllAnimals, updateAnimal, createAnimal } from '../services/AnimalService';
import { AnimalCriteria } from '../models/AnimalCriteria'; 

interface AnimalStore {
  animal: AnimalDto | null;
  animals: AnimalDto[];
  fetchAnimalById: (id: number, force?: boolean) => Promise<void>;
  fetchAllAnimals: (criteria: Partial<AnimalCriteria>) => Promise<void>;
  updateAnimal: (id: number, updates: Partial<AnimalDto>) => Promise<void>;
}

const useAnimalStore = create<AnimalStore>()(
  devtools((set) => ({
    animal: null,
    animals: [],
    fetchAnimalById: async (id) => {


      set({ animal: null });

      // Otherwise, fetch it from the API
      const fetchedAnimal = await fetchAnimal(id);
      set({ animal: fetchedAnimal });
    },
    fetchAllAnimals: async (criteria: Partial<AnimalCriteria>) => {
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