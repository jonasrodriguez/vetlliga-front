import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavigationBar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">www.pagina.com / la mejor prote del mundo</Typography>
        <Button variant="contained" color="success">+ Nuevo animal</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;