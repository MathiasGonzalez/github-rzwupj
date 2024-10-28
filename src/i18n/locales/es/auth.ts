export const auth = {
  signup: {
    title: "Regístrate",
    subtitle: "Crea tu cuenta",
    firstName: {
      label: "Nombre",
      placeholder: "Ingresa tu nombre",
      error: "El nombre es obligatorio"
    },
    lastName: {
      label: "Apellido",
      placeholder: "Ingresa tu apellido",
      error: "El apellido es obligatorio"
    },
    email: {
      label: "Correo electrónico",
      placeholder: "Ingresa tu correo electrónico",
      error: {
        required: "El correo electrónico es obligatorio",
        invalid: "El correo electrónico no es válido"
      }
    },
    password: {
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      error: {
        required: "La contraseña es obligatoria",
        length: "La contraseña debe tener al menos 8 caracteres"
      }
    },
    confirmPassword: {
      label: "Confirmar Contraseña",
      placeholder: "Confirma tu contraseña",
      error: {
        required: "La confirmación de la contraseña es obligatoria",
        match: "Las contraseñas no coinciden"
      }
    },
    company: {
      label: "Empresa",
      placeholder: "Ingresa el nombre de tu empresa",
      error: "El nombre de la empresa es obligatorio"
    },
    role: {
      label: "Rol",
      placeholder: "Ingresa tu rol",
      error: "El rol es obligatorio"
    },
    submit: {
      default: "Regístrate",
      loading: "Registrando...",
      error: "Hubo un error al enviar el formulario"
    },
    login: {
      welcomeBack: "Bienvenido de nuevo",
      signInToAccess: "Inicia sesión para acceder a tu cuenta",
      emailAddress: "Correo electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      password: "Contraseña",
      passwordPlaceholder: "Ingresa tu contraseña",
      rememberMe: "Recuérdame",
      forgotPassword: "¿Olvidaste tu contraseña?",
      signIn: "Iniciar sesión",
      signingIn: "Iniciando sesión...",
      noAccount: "¿No tienes una cuenta?",
      signUp: "Regístrate",
      text: "¿Ya tienes una cuenta?",
      link: "Inicia sesión aquí"
    }
  }
};