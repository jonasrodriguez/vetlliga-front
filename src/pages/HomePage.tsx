import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          Benvinguts a la Lliga Protectora d'Animals i Plantes
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Aquesta aplicació és una eina interna per gestionar els animals de la Lliga Protectora d'Animals i Plantes. <br />
          Feu servir les diferents seccions per consultar, afegir i actualitzar la informació dels animals atesos per l'associació.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
