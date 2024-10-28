export const auth = {
  signup: {
    title: "Sign Up",
    subtitle: "Create your account",
    firstName: {
      label: "First Name",
      placeholder: "Enter your first name",
      error: "First name is required"
    },
    lastName: {
      label: "Last Name",
      placeholder: "Enter your last name",
      error: "Last name is required"
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      error: {
        required: "Email is required",
        invalid: "Email is invalid"
      }
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      error: {
        required: "Password is required",
        length: "Password must be at least 8 characters"
      }
    },
    confirmPassword: {
      label: "Confirm Password",
      placeholder: "Confirm your password",
      error: {
        required: "Confirm password is required",
        match: "Passwords do not match"
      }
    },
    company: {
      label: "Company",
      placeholder: "Enter your company name",
      error: "Company name is required"
    },
    role: {
      label: "Role",
      placeholder: "Enter your role",
      error: "Role is required"
    },
    submit: {
      default: "Sign Up",
      loading: "Signing Up...",
      error: "There was an error submitting the form"
    },
    login: {
      welcomeBack: "Welcome Back",
      signInToAccess: "Sign in to access your account",
      emailAddress: "Email Address",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign In",
      signingIn: "Signing In...",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      text: "Already have an account?",
      link: "Sign in here"
    }
  }
};