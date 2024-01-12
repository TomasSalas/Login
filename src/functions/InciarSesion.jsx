export const IniciarSesion = async (data) => {

  const { rut, contrasena } = data

  const params = {
    run: rut.replace("-", "").replace(/\./g, ""),
    contrasena
  }

  try {
    const response = await fetch('https://app-prod-eastus-login-api.azurewebsites.net/api/Usuario/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const resultado = await response.json();
    
    if(resultado.isExitoso){
      return {
        error: false,
        data: resultado
      }
    }else{
      return {
        error: true,
        data: resultado.errorMessages
      }
    }
  }catch(err) {
    return {
      error: true,
      data: 'Error fetching'
    }
  }
}