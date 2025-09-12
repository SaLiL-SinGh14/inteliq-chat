import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    background: { default: '#f7f8fa' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { boxShadow: '0 4px 14px rgba(0,0,0,0.06)' } } },
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
  },
});
