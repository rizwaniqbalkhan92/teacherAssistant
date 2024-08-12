import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../Constants/AuthApiCalling';
import {login, useAuth} from '../ContextApi/AuthContext'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://rizwaniqbal-portfolio.web.app/">
        rizCode
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignUp() {
  const {login}=useAuth()
  const navigate=useNavigate()
  const handleSubmit =async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const data2={email:data.get('email'),password:data.get('password')}
    const response = await createAccount(data2)
    console.log("response======",response)
    if(response){
      const token = response?.stsTokenManager?.accessToken
      const userId = response?.uid
      console.log("CHECK VALUES===>>>",token,userId);
      // login(response?.stsTokenManager?.accessToken,response?.uid)
      localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    
      navigate('/dashboard');
    
    }
  };
  function goToSignIn(){

    navigate('/login');
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
     
          <Avatar
  alt="DostAi Logo"
  src={require('../../Assets/images/dostAi.png')}
  sx={{ width: 300, height: 300 }}
/>
       
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                />
              </Grid>
        
        
             
      
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Acount
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="/login" onSubmit={goToSignIn} variant="body2">
                  Already Account ? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright/>

      </Container>
    </ThemeProvider>
  );
}