import { Box, Typography } from '@mui/material';

const Footer = () => {

  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        © 2025 My App
      </Typography>
    </Box>
  );
};

export default Footer;