import { useState, useEffect } from "react";
import { Paper, Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { fetchHealth } from "../services/HealthService";
import { login as userLogin } from "../services/UserService";
import { parseJwt } from "../utils/jwt";
import { useAuthStore } from "../stores/AuthStore";

import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [backendStatus, setBackendStatus] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const health = await fetchHealth();
        if (health.status === "UP") {
          setBackendStatus(true);
        } else {
          setBackendStatus(false);                                                     
        }
      } catch {
        setBackendStatus(false);
      } 
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {

    const token = await userLogin(username, password);
    if (!token) {
      setLoginError(true);
      return;
    }

    setLoginError(false);
    const payload = parseJwt(token);
    console.log(JSON.stringify(payload));
    login(payload);

    navigate('/');
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
          {/*backendStatus ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} />
              <Typography variant="body2">Checking backend...</Typography>
            </>
          ) : */
          backendStatus ? backendStatusOk : backendStatusKo}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
