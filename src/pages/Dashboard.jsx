// src/pages/Dashboard.js
import React from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // If the user has accounts, compute net worth.
  // For this demo: if account group is "Credit" or "Loan", subtract its balance, otherwise add.
  const computeNetWorth = (accounts) => {
    return accounts.reduce((acc, account) => {
      const balance = parseFloat(account.balance) || 0;
      const group = account.group.toLowerCase();
      if (group === "credit" || group === "loan") {
        return acc - balance;
      }
      return acc + balance;
    }, 0);
  };

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
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Personal Finance Demo
              </Typography>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/accounts">
                Accounts
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          {currentUser.accounts && currentUser.accounts.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Account Details
              </Typography>

              <Typography variant="h6">
                Net Worth: {computeNetWorth(currentUser.accounts)}
              </Typography>
              <Paper variant="outlined" sx={{ mt: 1, mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Name</TableCell>
                      <TableCell>Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentUser.accounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}
          <Button variant="contained" onClick={handleLogout} sx={{ mt: 2 }}>
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
