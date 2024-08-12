import React from 'react';
import { Container, Typography, Button, Switch, FormControlLabel, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Replace with your theme color
    },
    secondary: {
      main: '#F36D42', // Replace with your secondary theme color
    },
  },
});

const SettingsPage = () => {
    const navigate=useNavigate()
   
    const { logout } = useAuth();
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logged out');
    logout();
    navigate('/login');
  };

  const handleThemeChange = () => {
    // Add logic to change theme

    // setDarkMode(!darkMode);
    // console.log('Theme changed');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleThemeChange} color="primary" />}
          label="Dark Mode"
        />

     

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default SettingsPage;
