import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { useAuthStore } from './stores/AuthStore';

import { AnimalType } from './enums/AnimalType';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AnimalListPage from './pages/AnimalListPage';
import DetallesAnimal from './pages/DetallesAnimal';
import LoginPage from './pages/LoginPage';


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
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
