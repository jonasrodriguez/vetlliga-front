import dayjs, { Dayjs } from "dayjs";

export const parseDate = (value: string | null | undefined): Dayjs | null => {
  try {
    if (!value) {
      return null;
    }
    
    const d = dayjs(value);
    return d.isValid() ? d : null;
  } catch (err) {
    console.error("Fecha invalida:", value, err);
    return null;
  }
};

export const formatDateToString = (date: Dayjs | null): string => {
  try {
    if (!date) {
      return "";
    }

    return date.isValid() ? date.format("YYYY-MM-DD") : "";
  } catch (err) {
    console.error("Error formateando Dayjs:", date, err);
    return "";
  }
};
