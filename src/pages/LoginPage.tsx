import { useState } from "react";
import { Paper, Box, Button, CircularProgress, Container, TextField, Typography, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [checkingBackend, ] = useState(false);
  const [backendUp, ] = useState<boolean | null>(null);

  // Periodically check backend health
  /*useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get("/api/init");
        setBackendUp(response.data.status === "ok");
      } catch {
        setBackendUp(false);
      } finally {
        setCheckingBackend(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);*/

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      setLoginError(false);
      // handle login token, redirect, etc.
    } catch {
      setLoginError(true);
    }
  };

  const loginErrorMessage = (
    <Alert severity="error">Error al iniciar sesión. Revisa tus credenciales.</Alert>
  );

  const backendStatusOk = (
    <>
      <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
      <Typography variant="body2" color="green">
        La base de datos de Vetlliga esta conectada
      </Typography>
    </>
  );

  const backendStatusKo = (
    <>
      <CancelIcon sx={{ color: "red", mr: 1 }} />
      <Typography variant="body2" color="red">
        La base de datos de Vetlliga esta desconectada
      </Typography>
    </>
  );
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "#fff", mt: 10, p: 4, gap: 2 }}>

        <Typography variant="h5" textAlign="center" gutterBottom>
          Bienvenid@ a Vetlliga
        </Typography>

        <TextField
          label="Usuario"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />

        <TextField
          label="Contraseña"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {loginError && loginErrorMessage}

        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Iniciar Sesión
        </Button>

        <Box display="flex" alignItems="center" justifyContent="center">
          {checkingBackend ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} />
              <Typography variant="body2">Checking backend...</Typography>
            </>
          ) : backendUp ? backendStatusOk : backendStatusKo}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
