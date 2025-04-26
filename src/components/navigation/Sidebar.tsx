import { useState } from 'react';
import { List, Typography, ListItemButton, Paper, Collapse, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

type SidebarProps = {
  drawerWidth: number;
};

function Sidebar({ drawerWidth }: SidebarProps) {
  const [openPerros, setOpenPerros] = useState(false);
  const [openGatos, setOpenGatos] = useState(false);

  const handleTogglePerros = () => {
    setOpenPerros((prev) => !prev);
  };

  const handleToggleGatos = () => {
    setOpenGatos((prev) => !prev);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: drawerWidth,
        bgcolor: 'secondary.main',
        display: { xs: 'none', md: 'block' },
        padding: '2px',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ padding: '8px' }}>
        Menú
      </Typography>
      <Divider sx={{ marginBottom: '8px' }} />
      <List dense>

        {/* Perros with Submenu */}
        <ListItemButton
          component={RouterLink}
          to="/perros"
          onClick={handleTogglePerros}          
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Perros
          </Typography>
          {openPerros ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPerros} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/perros/en-protectora"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                En Protectora
              </Typography>
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to="/perros/en-acogida"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                En Acogida
              </Typography>
            </ListItemButton> 
            <ListItemButton
              component={RouterLink}
              to="/perros/reservados"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                Reservados
              </Typography>
            </ListItemButton>                       
            <ListItemButton
              component={RouterLink}
              to="/perros/adoptados"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                Adoptados
              </Typography>
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to="/perros/fallecidos"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                Fallecidos
              </Typography>
            </ListItemButton>
          </List>
        </Collapse>

        {/* Gatos with Submenu */}
        <ListItemButton
          component={RouterLink}
          to="/gatos"
          onClick={handleToggleGatos}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Gatos
          </Typography>
          {openGatos ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openGatos} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/gatos/en-protectora"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                En Protectora
              </Typography>
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to="/gatos/en-acogida"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                En Acogida
              </Typography>
            </ListItemButton>    
            <ListItemButton
              component={RouterLink}
              to="/gatos/reservados"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                Reservados
              </Typography>
            </ListItemButton>        
            <ListItemButton
              component={RouterLink}
              to="/gatos/adoptados"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                Adoptados
              </Typography>
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to="/gatos/fallecidos"
              sx={{ pl: 4 }}
            >
              <Typography variant="body2">
                Fallecidos
              </Typography>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Paper>
  );
}

export default Sidebar;