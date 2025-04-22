import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

const baseTheme = createTheme();

const theme = createTheme(deepmerge(baseTheme, {
  palette: {
    mode: 'light',
    primary: {
      main: '#4db6ac', // soft teal
    },
    secondary: {
      main: '#ffb74d', // warm orange
    },
    background: {
      default: '#fdfdfd',
      paper: '#ffffff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.4rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'primary.main', // Default background color
          color: 'white', // Default text color
          borderRadius: 12, // Rounded corners
          '&:hover': {
            backgroundColor: 'darkgreen', // Hover background color
          },
        },
      },
    },    
  },

}));

export default theme;

/*

shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // pill shape
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },

*/