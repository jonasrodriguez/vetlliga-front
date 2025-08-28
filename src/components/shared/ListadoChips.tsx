import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Chip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface ListadoChipsProps {
  title: string;
  values: string[];
  handleAddNewValue: (value: string) => void;
  handleDeleteValue: (index: number) => void;
}

const ListadoChips: React.FC<ListadoChipsProps> = ({ title, values, handleAddNewValue, handleDeleteValue }) => {

  const [newValue, setNewValue] = useState('');

  const handleAddEnfermedad = () => {
    handleAddNewValue(newValue.trim());
    setNewValue('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 2 }}>
      <Typography>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        {values
          .filter((v) => v && v.trim?.() !== "")
          .map((value, index) => (
            <Chip key={index} label={value} onDelete={() => handleDeleteValue(index)} />
        ))}
        <Box sx={{ flexGrow: 1 }} />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Agregar enfermedad"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleAddEnfermedad}>
                  <SaveIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default ListadoChips;