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
import supabase from "../supabase/client";
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const schemaValidation = Yup.object({
  username: Yup.string()
    .min(6, 'Must contain at least 6 characters')
    .required('Required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Must contain at least 4 characters')
    .required('password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function SignUp() {

  const theme = useTheme();
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterFormik = async (values) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
        setErrorMessage(error.error_description || error.message);
        console.log(error);
      } else {
        navigate('/settings');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: schemaValidation,
    onSubmit: (values) => {
      handleRegisterFormik(values);
    }
  });

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
          <Typography component="h1" variant="h5" paddingBottom={2}>
            Sign up
          </Typography>

          <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
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
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="confirm_password"
                      label="Confirm Password"
                      name="confirm_password"
                      autoComplete="family-name"
                      type="password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                      helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress /> : <span>SIGN UP</span>}
                </Button>
                <p style={{ color: 'red', textAlign: 'center', marginTop: 0 }}>{errorMessage}</p>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link component={NavLink} to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              
              </form>

        </Box>
      </Container>
    </ThemeProvider>
  );
}