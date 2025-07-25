export interface AnimalCriteria {
  tipo?: string;
  estado?: number;
  localizacion?: number;
  fechaLocalizacion?: string;
  fechaEstado?: string;

  vacunaDesde?: string;
  vacunaHasta?: string;
  desparasitoInternaDesde?: string;
  desparasitoInternaHasta?: string;
  desparasitoExternaDesde?: string;
  desparasitoExternaHasta?: string;
  testDesde?: string;
  testHasta?: string;

  search?: string;

  sortBy: string;
  sortDirection: 'asc' | 'desc';
  page: number;
  pageSize: number;
}