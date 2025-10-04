import React from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { parseDate, formatDateToString } from "../../utils/dateUtils";

interface EstadoChipProps {
  label: string;
  value: string | null;
  onChange: (newDate: string | null) => void;
  width?: number;
  color?: 'green' | 'blue' | 'none';
}

const AnimalDatePicker: React.FC<EstadoChipProps> = ({ label, value, onChange, width = 250, color = 'none' }) => {

  const colorStyle = color === 'none' ? undefined : (color === 'green' ? 'success.main' : 'primary.main');

  const props = {
    sx: {
      width: width,
      color: colorStyle,
      '& fieldset': { borderColor: colorStyle }
    },
    slotProps: {
      textField: {
        InputLabelProps: {
          sx: {
            color: colorStyle,
          },
        },
        InputProps: {
          sx: {
            color: colorStyle,
          },
        },
      },
    },
  };
 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        format="DD/MM/YYYY"
        value={parseDate(value)}
        onChange={(newDate) => onChange(formatDateToString(newDate))}
        {...props}
      />
    </LocalizationProvider>
  );
};



export default AnimalDatePicker;