import React, { useState } from "react";
import { Container, TextField, Button, Typography, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../services/userService";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getUserByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      // Save the logged-in user (demo purpose: using localStorage)
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <Typography variant="body2">
          Forgot your password? <Link to="/forgot-password">Reset here</Link>
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Typography variant="body2">
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Stack>
    </Container>
  );
}

export default Login;
