const formatDate = (dateStr?: string) => {
  
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('es-ES');
};

export default formatDate;