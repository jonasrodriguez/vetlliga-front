import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

const headerHeight = 64;
const drawerWidth = 240;

const MainLayout: React.FC = () => {
  return (
    <Box
      /*sx={{
        '*': {
          outline: '1px solid rgba(255, 0, 0, 0.2)' // soft red outlines everywhere
        }
      }}*/
    >
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Header headerHeight={headerHeight} />
      <Box sx={{ display: 'flex', flexGrow: 1}}>

        {/* Sidebar */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0, width: drawerWidth }}>
          <Sidebar drawerWidth={drawerWidth} />
        </Box>
        
        {/* Main component */}
        <Container component="main" maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', pt: 4 }}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Outlet />
          </Box>
          <Footer />
        </Container>  
      </Box>
    </Box>
    </Box>
  );
};

export default MainLayout;

/*
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw' }}>
      <Header headerHeight={headerHeight} />
      <Container maxWidth="lg" sx={{ display: 'flex', flexGrow: 1, bgcolor: 'secondary.main' }}>
        <Sidebar drawerWidth={drawerWidth} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container sx={{ flexGrow: 1 }}>
            <Outlet />
          </Container>
          <Footer />
        </Box>
      </Container>
    </Box>
*/
