import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";


export const LoginPage = () => {

  const { status } = useSelector( state => state.auth );

  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  
  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm({
    email: '',
    password: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
    // Se importa la accion del thunk y se envia como parametro el formState con el email y password
    dispatch( startLoginWithEmailPassword(formState) );

  };

  const onGoogleSignIn = (event) => {
    
    event.preventDefault();

    dispatch( startGoogleSignIn() );

  }


  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="Correo" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />

            </Grid>
            <Grid item xs={ 12 } sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                  disabled={isAuthenticating}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  onClick={ onGoogleSignIn } 
                  variant="contained" 
                  fullWidth
                  disabled={isAuthenticating}
                >
                  <Google />
                  <Typography sx={{ml:2}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Link component={ RouterLink } color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>   
  )
}
