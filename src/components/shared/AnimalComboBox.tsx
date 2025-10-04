import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface AnimalComboBox {
  label: string;
  value: string  | number;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
  width?: number;
  color?: 'green' | 'blue' | 'none';
}

const AnimalComboBox: React.FC<AnimalComboBox> = ({ label, value, onChange, options, width = 250, color = 'none' }) => {

  const colorStyle = color === 'none' ? undefined : (color === 'green' ? 'success.main' : 'primary.main');

  const styleProps = {
     color: colorStyle,
      '& .MuiSelect-icon': { color: colorStyle },
      '& fieldset': { borderColor: colorStyle }
  };
 
  return (
    <FormControl sx={{ width: width }} >
      <InputLabel id={`${label}-label`} sx={{ color: colorStyle }}>{label}</InputLabel>
      <Select 
        labelId={`${label}-label`} 
        label={label} 
        defaultValue={value} 
        onChange={e => onChange(e.target.value)}
        sx={styleProps}
        >
          {options.map(opt => (
            <MenuItem key={opt.value ?? '-'} value={opt.value}>{opt.label}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};



export default AnimalComboBox;