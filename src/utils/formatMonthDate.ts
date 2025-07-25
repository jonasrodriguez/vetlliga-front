const formatMonthDate = (dateStr?: string) => {
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return '';
  }

  const month = date.toLocaleString('es-ES', { month: 'long' });
  const year = date.getFullYear();

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${capitalizedMonth} ${year}`;
};

export default formatMonthDate;