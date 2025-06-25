import { AnimalDto } from "../models/AnimalDto";
import calculoEdad from "./calculoEdad";

function animalCsv(animalList: AnimalDto[], filename = 'animals.csv'): void {
  
  if (!animalList || animalList.length === 0) {
    return;
  }

  const headers = ["Nombre", "Num. Registro", "Tipo", "Sexo", "Edad", "Ultimo Peso", "Fecha última desparasitación externa", "Producto última desparasitación externa", "Fecha última desparasitación interna", "Producto última desparasitación interna", "Fecha última vacunación", "Producto última vacunación"];

  function buildRow(animal: AnimalDto): string {

    const tipo = animal.tipo === 'GATOS' ? 'Gato' : 'Perro';
    const sexo = animal.sexo === 'MACHO' ? 'Macho' : 'Hembra';

    return animal.nombre + ',' +
      animal.numeroRegistro + ',' + 
      tipo + ',' + 
      sexo + ',' +
      calculoEdad(animal.fechaNacimiento) + ',' +
      animal.ultimoPeso + ',' +
      animal.fechaUltimaDesparasitacionExterna + ',' +
      animal.tipoUltimaDesparasitacionExterna + ',' +
      animal.fechaUltimaDesparasitacionInterna + ',' +
      animal.tipoUltimaDesparasitacionInterna + ',' +
      animal.fechaUltimaVacunacion + ',' +
      animal.tipoUltimaVacunacion;
  }

  const csvRows = [
    headers.join(','),
    ...animalList.map(animal =>  buildRow(animal))
  ];

  const csvString = csvRows.join('\n');

  const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export default animalCsv;
