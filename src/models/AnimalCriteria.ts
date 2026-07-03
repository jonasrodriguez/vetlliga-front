export interface AnimalCriteria {
  tipo?: string;
  estado?: number;
  localizacion?: number;
  fechaLocalizacion?: string;
  fechaEstado?: string;

  vacuna?: string;
  desparasitoInterna?: string;
  desparasitoExterna?: string;
  test?: string;

  search?: string;

  sortBy: string;
  sortDirection: 'asc' | 'desc';
  page: number;
  pageSize: number;
}