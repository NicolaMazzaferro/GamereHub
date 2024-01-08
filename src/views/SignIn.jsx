import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from '../supabase/client';
import { useState } from 'react';
import { Divider } from '@mui/material';
import { IoLogoDiscord, IoLogoFacebook } from "react-icons/io5";

export default function SignIn() {

  const theme = useTheme();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(loginForm));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(error.error_description || error.message);
        console.log(error);
      } else {
        loginForm.reset();
        navigate('/account');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithDiscord = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
      })
      if (error) {
        setErrorMessage(error.error_description || error.message);
        console.log(error);
      } else {
        navigate('/account');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      })
      if (error) {
        setErrorMessage(error.error_description || error.message);
        console.log(error);
      } else {
        navigate('/account');
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ mt: 2 }}>
              <Divider variant="middle" >
              <Typography variant="body2" color="textSecondary" align="center">
                Or sign in with
              </Typography>
              </Divider>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={signInWithDiscord}
              >
                <IoLogoDiscord size={30} />
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={signInWithFacebook}
              >
                <IoLogoFacebook size={30} />
              </Button>
            </Box>
            <p style={{ color: 'red', textAlign: 'center', marginTop: 2 }}>{errorMessage}</p>
            <Grid container>
              <Grid item>
                <Link component={NavLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}