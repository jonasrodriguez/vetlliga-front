const calculoEdad = (fechaNacimiento: string | null | undefined): string => {
  
  if (!fechaNacimiento) {
    return 'Desconocido';
  }

  const birthDate = new Date(fechaNacimiento);
  if (isNaN(birthDate.getTime())) {
    return 'Desconocido';
  }

  const today = new Date();
  const years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth() + (today.getDate() < birthDate.getDate() ? -1 : 0);

  const adjustedYears = years - (months < 0 ? 1 : 0);
  const adjustedMonths = (months + 12) % 12;

  if (adjustedYears < 0) {
    return 'Desconocido';
  }

  if (adjustedYears === 0 && adjustedMonths === 0) {
    return '< 1 mes';
  }

  if (adjustedYears === 0) {
    return adjustedMonths === 1 ? '1 mes' : `${adjustedMonths} meses`;
  }

  const yearText = adjustedYears === 1 ? '1 año' : `${adjustedYears} años`;
  const monthText = adjustedMonths === 0 ? '' : adjustedMonths === 1 ? '1 mes' : `${adjustedMonths} meses`;

  return monthText ? `${yearText} y ${monthText}` : yearText;
};

export default calculoEdad;