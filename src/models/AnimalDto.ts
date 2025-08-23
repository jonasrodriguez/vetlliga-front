export interface DesparasitacionDto {
  id?: number;
  fecha: string;
  tipo: string;
  producto: string;
}

export const initialDesparasitacion: DesparasitacionDto = {
  fecha: new Date().toISOString(),
  tipo: 'INTERNA',
  producto: '',
};

export interface HistorialDto {
  id?: number;
  fecha: string;
  descripcion: string;
}

export const initialHistorial: HistorialDto = {
  fecha: new Date().toISOString(),
  descripcion: '',
};

export interface IntervencionDto {
  id?: number;
  fecha: string;
  descripcion: string;
}

export const initialIntervencion: IntervencionDto = {
  fecha: new Date().toISOString(),
  descripcion: '',
}

export interface PesoDto {
  id?: number;
  fecha: string;
  peso: number;
}

export const initialPeso: PesoDto = {
  fecha: new Date().toISOString(),
  peso: 0,
};

export interface TestDto {
  id?: number;
  fecha: string;
  tipo: string;
  resultado: string;
  lote: string;
}

export const initialTest: TestDto = {
  fecha: new Date().toISOString(),
  tipo: '',
  resultado: '',
  lote: '',
};

export interface VacunacionDto {
  id?: number;
  fecha: string;
  tipo: string;
  producto: string;
}

export const initialVacunacion: VacunacionDto = {
  fecha: new Date().toISOString(),
  tipo: '',
  producto: '',
};

export interface DocumentoDto {
  id?: number;
  fecha: string;
  nombre: string;
  descripcion: string;
}

export const initialDocumento: DocumentoDto = {
  fecha: new Date().toISOString(),
  nombre: '',
  descripcion: '',
};

export interface AnimalDto {
  id: number;
  numeroRegistro: string;
  tipo: string;
  nombre: string;
  chip: string;
  fechaNacimiento: string;
  fechaEntrada: string;
  sexo: string;
  raza: string;
  color: string;
  origen: string;
  enfermedades: string;
  antecedentes: string;
  localizacion: string;
  localizacionDescripcion: string;
  fechaLocalizacion: string;
  estado: string;
  estadoDescripcion: string;
  fechaEstado: string;
  ultimoPeso: number | null;
  fechaUltimaVacunacion?: string;
  tipoUltimaVacunacion?: string;
  fechaUltimaDesparasitacionInterna?: string;
  tipoUltimaDesparasitacionInterna?: string;
  fechaUltimaDesparasitacionExterna?: string;
  tipoUltimaDesparasitacionExterna?: string;
  desparasitaciones: DesparasitacionDto[];
  historial: HistorialDto[];
  intervenciones: IntervencionDto[];
  pesos: PesoDto[];
  tests: TestDto[];
  vacunaciones: VacunacionDto[];
  documentos: DocumentoDto[];
}

export const initialAnimal: AnimalDto = {
  id: 0,
  numeroRegistro: '',
  tipo: '',
  nombre: '',
  chip: '',
  fechaNacimiento: new Date().toISOString().split('T')[0],
  fechaEntrada: new Date().toISOString().split('T')[0],
  sexo: '',
  raza: '',
  color: '',
  origen: '',
  enfermedades: '',
  antecedentes: '',
  localizacion: '',
  localizacionDescripcion: '',
  fechaLocalizacion: new Date().toISOString().split('T')[0],
  estado: '',
  estadoDescripcion: '',
  fechaEstado: new Date().toISOString().split('T')[0],
  ultimoPeso: null,
  desparasitaciones: [],
  historial: [],
  intervenciones: [],
  pesos: [],
  tests: [],
  vacunaciones: [],
  documentos: [],
};
