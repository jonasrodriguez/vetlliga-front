export enum LocalizacionPerro {
  NIVEL_1 = 0,
  NIVEL_2_3 = 1,
}

export enum LocalizacionGato {
  HOSPITALIZACION = 0,
  HOSPITALIZACION_CONSULTA = 1,
  CUARENTENA_ENTRADA = 2,
  CUARENTENA_SALIDA = 3,
  ADAPTACION = 4,
  CHIQUIPARK = 5,
  PATIO_VERDE = 6,
  ZONA_LEUCEMIA = 7,
  ANTIGUA_ADAPTACION = 8,
  COLONIA = 9,
  COLONIA_EXTERNA = 10,
  PROPIETARIO = 11,
}

export function getLocalizacionPerroDescripcion(local: LocalizacionPerro): string {  
  switch (local) {
    case LocalizacionPerro.NIVEL_1 :
      return 'Nivel 1';
    case LocalizacionPerro.NIVEL_2_3:
      return 'Nivel 2/3';
    default:
      return 'Desconocido';
  }
}

export function getLocalizacionGatoDescripcion(local: LocalizacionGato): string {  
  switch (local) {
    case LocalizacionGato.HOSPITALIZACION:
      return 'Hospitalización';
    case LocalizacionGato.HOSPITALIZACION_CONSULTA:
      return 'Hospitalización Consulta';
    case LocalizacionGato.CUARENTENA_ENTRADA:
      return 'Cuarentena Entrada';
    case LocalizacionGato.CUARENTENA_SALIDA:
      return 'Cuarentena Salida';
    case LocalizacionGato.ADAPTACION:
      return 'Adaptación';
    case LocalizacionGato.CHIQUIPARK:
      return 'Chiquipark';
    case LocalizacionGato.PATIO_VERDE:
      return 'Patio Verde';
    case LocalizacionGato.ZONA_LEUCEMIA:
      return 'Zona Leucemia';
    case LocalizacionGato.ANTIGUA_ADAPTACION:
      return 'Antigua Adaptación';
    case LocalizacionGato.COLONIA:
      return 'Colonia';
    case LocalizacionGato.COLONIA_EXTERNA:
      return 'Colonia Externa';
    case LocalizacionGato.PROPIETARIO:
      return 'Propietario';
    default:
      return 'Desconocido';
  }
}

export function localizacionLiterales(tipo: string, localizacion: string): string {  

  if (tipo === 'GATO') {
    return literalesGato(localizacion);
  } else if (tipo === 'PERRO') {
    return literalesPerro(localizacion);
  } else {
    return 'Desconocido';
  }
}

function literalesGato(localizacion: string): string {
 switch (localizacion) {
    case 'HOSPITALIZACION':
      return 'Hospitalización';
    case 'HOSPITALIZACION_CONSULTA':
      return 'Hospitalización Consulta';
    case 'CUARENTENA_ENTRADA':
      return 'Cuarentena Entrada';
    case 'CUARENTENA_SALIDA':
      return 'Cuarentena Salida';
    case 'ADAPTACION':
      return 'Adaptación';
    case 'CHIQUIPARK':
      return 'Chiquipark';
    case 'PATIO_VERDE':
      return 'Patio Verde';
    case 'ZONA_LEUCEMIA':
      return 'Zona Leucemia';
    case 'ANTIGUA_ADAPTACION':
      return 'Antigua Adaptación';
    case 'COLONIA':
      return 'Colonia';
    case 'COLONIA_EXTERNA':
      return 'Colonia Externa';
    case 'PROPIETARIO':
      return 'Propietario';
    default:
      return 'Desconocido';
  }
}

function literalesPerro(localizacion: string): string {
  switch (localizacion) {
    case 'NIVEL_1':
      return 'Nivel 1';
    case 'NIVEL_2_3':
      return 'Nivel 2/3';
    default:
      return 'Desconocido';
  }
}