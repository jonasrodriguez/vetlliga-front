import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import theme from './styles/theme';
import { useAuthStore } from './stores/AuthStore';

import { AnimalType } from './enums/AnimalType';

import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import GlobalNotification from './components/shared/GlobalNotification';
const HomePage = lazy(() => import('./pages/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AnimalListPage = lazy(() => import('./pages/AnimalListPage'));
const DetallesAnimal = lazy(() => import('./pages/DetallesAnimal'));
const ConfigPage = lazy(() => import('./pages/ConfigPage'));

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { auth } = useAuthStore();
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <GlobalNotification />
        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '2rem' }}><CircularProgress /></div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<HomePage />} />
              <Route path="perros/:estado?" element={<AnimalListPage type={AnimalType.PERROS} />} />
              <Route path="gatos/:estado?" element={<AnimalListPage type={AnimalType.GATOS} />} />
              <Route path="ficha/:id?" element={<DetallesAnimal />} />
              <Route path="configuracion/:tipo?" element={<ConfigPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
