import { List, Typography, ListItemButton, Paper, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type SidebarProps = {
  drawerWidth: number;
};

function Sidebar({ drawerWidth }: SidebarProps) {
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
      <List>
        {/* Perros Section */}
        <ListItemButton component={RouterLink} to="/perros">
          <Typography variant="body1" sx={{ fontWeight: 'bold', paddingLeft: '8px' }}>
            Perros
          </Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/perros/en-protectora" sx={{ pl: 4 }}>
          <Typography variant="body2">En Protectora</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/perros/en-acogida" sx={{ pl: 4 }}>
          <Typography variant="body2">En Acogida</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/perros/reservados" sx={{ pl: 4 }}>
          <Typography variant="body2">Reservados</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/perros/adoptados" sx={{ pl: 4 }}>
          <Typography variant="body2">Adoptados</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/perros/fallecidos" sx={{ pl: 4 }}>
          <Typography variant="body2">Fallecidos</Typography>
        </ListItemButton>

        {/* Gatos Section */}
        <ListItemButton component={RouterLink} to="/gatos">
          <Typography variant="body1" sx={{ fontWeight: 'bold', paddingLeft: '8px', marginTop: '16px' }}>
            Gatos
          </Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/gatos/en-protectora" sx={{ pl: 4 }}>
          <Typography variant="body2">En Protectora</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/gatos/en-acogida" sx={{ pl: 4 }}>
          <Typography variant="body2">En Acogida</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/gatos/reservados" sx={{ pl: 4 }}>
          <Typography variant="body2">Reservados</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/gatos/adoptados" sx={{ pl: 4 }}>
          <Typography variant="body2">Adoptados</Typography>
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/gatos/fallecidos" sx={{ pl: 4 }}>
          <Typography variant="body2">Fallecidos</Typography>
        </ListItemButton>
      </List>
      <Divider sx={{ marginBottom: '8px' }} />
      {/* Recordatorios Section */}
      <ListItemButton component={RouterLink} to="/recordatorios" sx={{ pl: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Recordatorios
        </Typography>
      </ListItemButton>
    </Paper>
  );
}

export default Sidebar;