import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Ultimate Personal Finance
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage your finances with ease.
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/register">
          Register
        </Button>
      </Stack>
    </Container>
  );
}

export default Homepage;
