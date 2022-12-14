import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: 'rivas@gmail.com',
  password: '1234568',
  displayName: 'Xanul'
}

const formValidations = {
  email: [ (value) => value.includes('@') , 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 letras' ],
  displayName: [ (value) => value.length >=1, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthenthication = useMemo(() => status === 'checking', [status])

  const { displayName, email, password, onInputChange, formState, 
          displayNameValid, emailValid, passwordValid, isFormValid 
        } = useForm(formData, formValidations);
    
  
        

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return
  
    dispatch( startCreatingUserWithEmailPassword(formState) );
  }


  return (
    <AuthLayout title="Register">
      <h1>FormValue { isFormValid ? 'Valido' : 'Incorrecto' }</h1>
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn">
          <Grid container>

            <Grid item xs={ 12 } sx={{mt:2}}>
              <TextField 
                label="Nombre Completo" 
                type="text" 
                placeholder="Nombre completo" 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted}
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="Correo" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted}
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{mt:2}}>
              <TextField 
                label="Contrase??a" 
                type="password" 
                placeholder="Contrase??a" 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted}
                helperText={ passwordValid }
              />
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
              <Grid item xs={ 12 } >
                <Button 
                  type="submit"
                  variant="contained" 
                  fullWidth
                  disabled={ isCheckingAuthenthication }
                >
                  Crear cuenta
                </Button>
              </Grid>
              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage? '' : 'none' } 
              >
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>

            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1}}>??Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color="inherit" to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>   
  )
}
