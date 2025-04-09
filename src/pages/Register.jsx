import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail, addUser } from "../services/userService";

const accountTypes = [
  { value: "personal", label: "Personal" },
  { value: "family", label: "Family Portfolio" },
];

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "personal",
    // Include additional fields for settings (stored in same JSON)
    settings: {
      theme: "light",
      notifications: true,
    },
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user already exists
    if (getUserByEmail(formData.email)) {
      setError("User with this email already exists.");
      return;
    }
    addUser(formData);
    navigate("/login");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Account Type"
          name="accountType"
          variant="outlined"
          fullWidth
          value={formData.accountType}
          onChange={handleChange}
        >
          {accountTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Stack>
    </Container>
  );
}

export default Register;
