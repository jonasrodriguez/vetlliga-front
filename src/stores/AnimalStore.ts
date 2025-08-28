import { create } from 'zustand';
import { AnimalDto, Page } from '../models/AnimalDto';
import * as animalService from '../services/AnimalService';
import { AnimalCriteria } from '../models/AnimalCriteria'; 

interface AnimalStore {
  animal: AnimalDto | null;
  animalList: AnimalDto[];
  page: Page | null; 
  fetchAnimalById: (id: number, force?: boolean) => Promise<void>;
  fetchAllAnimals: (criteria: Partial<AnimalCriteria>) => Promise<void>;
  addAnimal: (animal: Omit<AnimalDto, 'id'>) => Promise<AnimalDto>;
  updateAnimal: (id: number, updates: Partial<AnimalDto>) => Promise<void>;
}

const useAnimalStore = create<AnimalStore>((set, get) => ({
  animal: null,
  animalList: [],
  page: null,

  fetchAnimalById: async (id, force = false) => {
    /*set({ animal: null });
    const existing = get().animalList.find((a) => a.id === id);
    if (existing && !force) {
      set({ animal: existing });
    } else {
      const fetchedAnimal = await animalService.fetchAnimal(id);
      set({ animal: fetchedAnimal });
    }*/
    set({ animal: null });
    const fetchedAnimal = await animalService.fetchAnimal(id);
    set({ animal: fetchedAnimal });
  },

  fetchAllAnimals: async (criteria: Partial<AnimalCriteria>) => {
    const animalsPage = await animalService.fetchAllAnimals(criteria);
    set({ 
      animalList: animalsPage.content,
      page: animalsPage.page
    });
  },

  addAnimal: async (animal: Omit<AnimalDto, 'id'>) => {
    const createdAnimal = await animalService.createAnimal(animal);
    set((state) => ({
      animalList: [...state.animalList, createdAnimal],
    }));
    return createdAnimal;
  },

  updateAnimal: async (id, updates) => {
    const updatedAnimal = await animalService.updateAnimal(id, updates);
    set((state) => ({
      animalList: state.animalList.map((a) => (a.id === id ? updatedAnimal : a)),
      animal: state.animal?.id === id ? updatedAnimal : state.animal,
    }));
  },
}));

export default useAnimalStore;