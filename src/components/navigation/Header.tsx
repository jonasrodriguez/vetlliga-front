import { Box, Avatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthStore } from '../../stores/AuthStore';

type HeaderProps = {
  headerHeight: number;
};

function Header({ headerHeight }: HeaderProps) {
  const { auth, logout } = useAuthStore();

  return (
    <Box sx={{ height: headerHeight, display: 'flex', bgcolor: 'primary.main', gap: 2, alignItems: 'center', paddingLeft: 2 }}>
      <Avatar src={'/images/logo.png'} sx={{ width: 50, height: 50 }} />
      <Typography variant="h6" noWrap component="div">
        Lliga protectora d'animals i plantes
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {auth && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 3 }}>
          <PersonIcon />
            <Typography
              variant="body1"
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
              onClick={logout}
            >
              {auth.username}
            </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Header;
