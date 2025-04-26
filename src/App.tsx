import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import theme from './styles/theme';

import { AnimalType } from './models/AnimalType';

import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const DetallesAnimal = lazy(() => import('./pages/DetallesAnimal'));
const AnimalListPage = lazy(() => import('./pages/AnimalListPage'));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DetallesAnimal />} />
              <Route path="perros/:estado?" element={<AnimalListPage type={AnimalType.PERROS} />} />
              <Route path="gatos/:estado?" element={<AnimalListPage type={AnimalType.GATOS} />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
