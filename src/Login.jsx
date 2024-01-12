import { useState } from 'react';
import './assets/style.css';
import { Backdrop, Box, Button,Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormatRut } from "./helpers/FormatRut";
import { IniciarSesion } from "./functions/InciarSesion";
import CircularProgress from '@mui/material/CircularProgress';
import { Toaster, toast } from 'sonner'
import ImgLogo from './assets/logo_rakin.png';
import { Link } from 'react-router-dom';

export function Login() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [open, setOpen] = useState(false);

  const onSubmit = async (parms) => {
    setOpen(true);
    try {
      const { error, data } = await IniciarSesion(parms);
      if (!error) {
        const { resultado } = data
        const { token } = resultado;
        location.href = "https://www.google.cl/" + token;
        setOpen(false);
        return;
      } else {
        setOpen(false);
        toast.error('Error en usuario y contraseña')
        return;
      }
    } catch (error) {
      setOpen(false);
      return;
    }
  }

  const onChangeInput = (data) => {
    if (data.target.value.includes('NaN-')) {
      setValue('rut', "");
    }
    setValue('rut', FormatRut(data.target.value))
  }

  return (
    <>
      <Toaster richColors />

      <Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height:'100vh' }}>
          <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
            <Container maxWidth="xs" sx={{ textAlign: 'center' , display: "flex", flexDirection: 'column'}}>
              <img
                src={ImgLogo}
              />
            </Container>

            <Container maxWidth="xs" sx={{ textAlign: 'center' , display: "flex", flexDirection: 'column'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" label="Rut" fullWidth
                      inputProps={{ maxLength: 12 }}
                      {...register("rut", {
                        onChange: (e) => { onChangeInput(e); },
                        required: true
                      })}
                    />
                    {errors.rut &&
                      <Typography
                        variant="subtitle1"
                        color="error"
                      >
                        Ingrese rut
                      </Typography>
                    }
                    <TextField
                      variant="outlined"
                      label="Contraseña"
                      type="password"
                      fullWidth
                      sx={{ marginTop: 3 }}
                      {...register("contrasena", { required: true })}
                      autoComplete="current-password"
                    />
                    {errors.contrasena &&
                      <Typography
                        variant="subtitle1"
                        color="error"
                      >
                        Ingrese contraseña
                      </Typography>
                    }
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      color="warning"
                      sx={{ marginTop: 3 }}
                    >
                      Ingresar
                    </Button>

                    <Box sx={{display:'flex', justifyContent:'center', marginTop:2}}>
                      <Link to="/recuperar-password">
                        <Typography variant='subtitle1'> ¿Olvidaste tu contraseña?</Typography>
                      </Link>
                    </Box>
                  </form>

            </Container>
          </Container>
      </Container>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="error" />
      </Backdrop>      
    </>
  )
}