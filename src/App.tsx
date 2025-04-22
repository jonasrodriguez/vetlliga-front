import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';

import MainLayout from './layouts/MainLayout';
import DetallesAnimal from './pages/DetallesAnimal';

import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import Perros from './pages/Perros';
import Gatos from './pages/Gatos';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DetallesAnimal />} />
            <Route path="perros" element={<Perros />} />
            <Route path="gatos" element={<Gatos />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
