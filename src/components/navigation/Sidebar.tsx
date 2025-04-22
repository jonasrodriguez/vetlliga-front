import { Drawer, List, ListItemText, Typography, ListItemButton, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type SidebarProps = {
  drawerWidth: number;
};

function Sidebar({ drawerWidth }: SidebarProps) {

  return (
    <Paper elevation={3} sx={{ width: drawerWidth, bgcolor: 'secondary.main', display: { xs: 'none', md: 'block' } }}>
      <Typography variant="h6" gutterBottom>Menu</Typography>
      <List dense>
        <ListItemButton component={RouterLink} to='perros'>
          <ListItemText primary="Perros" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to='gatos'>
          <ListItemText primary="Gatos" />
        </ListItemButton>
      </List>
    </Paper>
  );
  /*return (
    <Drawer variant="permanent" anchor="left" 
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}>
      <Typography variant="h6" gutterBottom>Menú</Typography>
      <List dense>
        <ListItemButton component={RouterLink} to='perros'>
          <ListItemText primary="Perros" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to='gatos'>
          <ListItemText primary="Gatos" />
        </ListItemButton>
      </List>
    </Drawer>
  );*/
};

export default Sidebar;

/*
<Collapse in>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="En Protectora" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="Nivel 1" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="Nivel 2-3" /></ListItem>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="Adoptados" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="2023" /></ListItem>
            <ListItem sx={{ pl: 8 }}><ListItemText primary="Enero" /></ListItem>
            <ListItem sx={{ pl: 8 }}><ListItemText primary="Febrero" /></ListItem>
            <ListItem sx={{ pl: 8 }}><ListItemText primary="Marzo" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="2024" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="2025" /></ListItem>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="Fallecidos" /></ListItem>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="En acogida" /></ListItem>
          </List>
        </Collapse>

        <Collapse in>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="En Protectora" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="Cuarentena entrada" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="Colonia" /></ListItem>
            <ListItem sx={{ pl: 6 }}><ListItemText primary="etc" /></ListItem>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="Adoptados" /></ListItem>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="Fallecidos" /></ListItem>
            <ListItem sx={{ pl: 4 }}><ListItemText primary="En acogida" /></ListItem>
          </List>
        </Collapse>

        */