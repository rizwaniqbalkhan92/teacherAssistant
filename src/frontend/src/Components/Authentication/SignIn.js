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
import { signInAccount } from '../Constants/AuthApiCalling';
import { ACTIONS, useAuth } from '../ContextApi/AuthContext';
import Axios from 'axios';

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

export default  function SignIn() {
  const {dispatch}=useAuth()
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
  try{
    let data = JSON.stringify({
        "email": data2.email,
        "password":data2.password
    });
    // console.log("API_CALLING===>>>",data)

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://testbackend-rho.vercel.app/api/signIn',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

  const response = await Axios.request(config)
  console.log("JSON.stringify(response.data)",JSON.stringify(response.data))
  console.log("JSON.stringify(response.data)",response)
  if(response){

    // dispatch({ type: ACTIONS.LOGIN, payload: { token:response?.stsTokenManager?.accessToken, userId:response?.uid } });
    const token = response?.data?.data?.stsTokenManager?.accessToken
    const userId = response?.data?.data?.uid
    console.log("CHECK VALUES===>>>",token,userId);
    
    // localStorage.setItem('token', token);
    // localStorage.setItem('userId', userId);
    
    // console.error('Failed to save auth data:', error);
    
    login(token, userId);
    // dispatch(login(response?.stsTokenManager?.accessToken,response?.uid))
    navigate('/dashboard');
  }
  }
  catch(error){
    return error
  }
  // const response =  signInAccount(data2)
  // console.log("response======",response)
 



  };





function goToSignUp(){

  navigate('/signup');
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
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
             
        
        
             
      
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Sign In Acount
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" onSubmit={goToSignUp} variant="body2">
                  Are you new ? Create Account
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