export interface DesparasitacionDto {
  fecha: string;
  peso: number;
}

export interface HistorialDto {
  fecha: string;
  peso: number;
}

export interface IntervencionDto {
  fecha: string;
  peso: number;
}

export interface PesoDto {
  fecha: string;
  peso: number;
}

export interface TestDto {
  fecha: string;
  peso: number;
}

export interface VacunacionDto {
  fecha: string;
  peso: number;
}

export interface AnimalDto {
  id: number;
  numeroRegistro: number;
  tipo: string;
  nombre: string;
  chip: string;
  fechaNacimiento: string;
  fechaEntrada: string;
  sexo: string;
  raza: string;
  origen: string;
  localizacion: number;
  fechaLocalizacion: string;
  estado: number;
  fechaEstado: string;
  desparasitaciones: DesparasitacionDto[];
  historial: HistorialDto[];
  intervenciones: IntervencionDto[];
  pesos: PesoDto[];
  tests: TestDto[];
  vacunaciones: VacunacionDto[];
}
