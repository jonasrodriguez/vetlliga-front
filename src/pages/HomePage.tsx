import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          Bienvenidos a Vetlliga
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Esta aplicación es una herramienta interna para gestionar los animales de la Lliga Protectora d'Animals i Plantes. <br />
          Utiliza las diferentes secciones para consultar, añadir y actualizar la información de los animales atendidos por la asociación.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
