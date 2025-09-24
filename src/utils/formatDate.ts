const formatDate = (dateStr?: string) => {
  
  try {
    if (!dateStr) {
      return '';
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('es-ES');
  } catch {
    return '';
  }
};

export default formatDate;