import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {currentUser ? (
        <>
          <Typography variant="body1" gutterBottom>
            Welcome, {currentUser.name}!
          </Typography>
          <Typography variant="body2" gutterBottom>
            Account Type: {currentUser.accountType}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Settings: Theme - {currentUser.settings.theme}, Notifications -{" "}
            {currentUser.settings.notifications ? "Enabled" : "Disabled"}
          </Typography>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Typography variant="body1">No user is logged in.</Typography>
      )}
    </Container>
  );
}

export default Dashboard;
