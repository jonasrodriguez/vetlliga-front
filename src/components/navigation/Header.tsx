import { Box,  Typography } from '@mui/material';

type HeaderProps = {
  headerHeight: number;
};

function Header({ headerHeight }: HeaderProps) {

  return (
    <Box sx={{ height: headerHeight, bgcolor: 'primary.main' }}>
      <Typography variant="h6" noWrap component="div">
        Lliga protectora d'animals i plantes
      </Typography>
    </Box>
  );
};

export default Header;
