import React from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, Box, Alert } from '@mui/material';

const Dashboard = () => {
  return (
    <Box p={3}>
      <Box mb={5}>
        <Typography variant="h6" gutterBottom>Perros</Typography>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Núm ficha</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell>Chip</TableCell>
                <TableCell>FN</TableCell>
                <TableCell>Entrada</TableCell>
                <TableCell>Ent. contacto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Toby</TableCell>
                <TableCell>1649</TableCell>
                <TableCell>♂</TableCell>
                <TableCell>982...</TableCell>
                <TableCell>3/1/23</TableCell>
                <TableCell>2/4/25</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nina</TableCell>
                <TableCell></TableCell>
                <TableCell>♀</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kira</TableCell>
                <TableCell></TableCell>
                <TableCell>♀</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box mb={5}>
        <Typography variant="h6" gutterBottom>Gatos</Typography>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Núm ficha</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell>Chip</TableCell>
                <TableCell>FN</TableCell>
                <TableCell>Entrada</TableCell>
                <TableCell>Enfermedad crónica</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Nala</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bruce</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Alert severity="info">
        → Poder buscar según las variables (Nombre, chip, Fecha entrada...)<br />
        → Poder extraer Excel o datos de vacunas que tocan este mes (última vacuna +1 año) si se puede
      </Alert>
    </Box>
  );
};

export default Dashboard;