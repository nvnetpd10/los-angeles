import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63', // Coral
    },
    secondary: {
      main: '#424242', // Charcoal
    },
    background: {
      default: '#f5f5f5', // Light gray
    },
    text: {
      primary: '#212121', // Dark charcoal
    },
  },
  typography: {
    fontFamily: 'Lora, serif',
    h4: {
      fontFamily: 'Playfair Display, serif',
    },
  },
  shape: {
    borderRadius: 12, // Rounded cards
  },
});

export default theme;
