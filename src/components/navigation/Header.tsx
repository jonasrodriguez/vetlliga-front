import { Box, Avatar, Typography } from '@mui/material';

type HeaderProps = {
  headerHeight: number;
};

function Header({ headerHeight }: HeaderProps) {

  return (
    <Box sx={{ height: headerHeight, display: 'flex', bgcolor: 'primary.main', gap: 2, alignItems: 'center', paddingLeft: 2 }}>
      <Avatar src={'/images/logo.png'} sx={{ width: 50, height: 50 }} />
      <Typography variant="h6" noWrap component="div">
        Lliga protectora d'animals i plantes
      </Typography>
    </Box>
  );
};

export default Header;
