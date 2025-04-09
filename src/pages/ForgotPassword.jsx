// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../services/userService";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user's password if the email exists.
    const success = updateUserPassword(email, newPassword);
    if (success) {
      setMessage(
        "Password updated successfully! You can now log in with your new password."
      );
      // Redirect to the login page after a short delay.
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMessage("No account found with that email.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Reset Password
        </Button>
      </Stack>
      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default ForgotPassword;
