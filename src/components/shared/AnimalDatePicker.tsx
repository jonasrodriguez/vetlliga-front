import React from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Dayjs } from "dayjs";
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
  const [tempValue, setTempValue] = React.useState<Dayjs | null>(parseDate(value));
  const colorStyle = color === 'none' ? undefined : (color === 'green' ? 'success.main' : 'primary.main');

  const handleChange = (newDate: Dayjs | null) => {
    onChange(formatDateToString(newDate));
  }

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
        onBlur: () => handleChange(tempValue),
      },
    },
  };
 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        format="DD/MM/YYYY"
        value={tempValue}
        onAccept={(newDate) => handleChange(newDate)}
        onChange={(newDate) => setTempValue(newDate)}
        {...props}
      />
    </LocalizationProvider>
  );
};



export default AnimalDatePicker;