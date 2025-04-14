// src/pages/Register.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail, addUser } from "../services/userService";

const accountTypes = [
  { value: "personal", label: "Personal" },
  { value: "family", label: "Family Portfolio" },
];

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "CAD", label: "CAD" },
  // Add more if needed
];

const accountGroups = [
  { value: "Cash", label: "Cash" },
  { value: "Bank", label: "Bank" },
  { value: "Credit", label: "Credit" },
  { value: "Loan", label: "Loan" },
];

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "personal",
    settings: {
      theme: "light",
      notifications: true,
    },
    currency: {
      baseCurrency: "USD",
      additionalCurrencies: "", // Comma-separated list, e.g.: "EUR, GBP"
    },
    accounts: [], // Each account: { name, group, balance }
  });
  const [error, setError] = useState("");

  // Handle change for top-level fields and nested currency
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is part of currency, use dot notation in name like "currency.baseCurrency"
    if (name.includes(".")) {
      const [group, key] = name.split(".");
      setFormData({
        ...formData,
        [group]: {
          ...formData[group],
          [key]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle account field changes for a specific account index
  const handleAccountChange = (index, field, value) => {
    const newAccounts = [...formData.accounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setFormData({ ...formData, accounts: newAccounts });
  };

  // Add a new empty account row
  const addAccount = () => {
    setFormData({
      ...formData,
      accounts: [...formData.accounts, { name: "", group: "", balance: "" }],
    });
  };

  // Remove an account by index
  const removeAccount = (index) => {
    const newAccounts = formData.accounts.filter((_, i) => i !== index);
    setFormData({ ...formData, accounts: newAccounts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user already exists
    if (getUserByEmail(formData.email)) {
      setError("User with this email already exists.");
      return;
    }
    // Save the new user (via localStorage simulation)
    addUser(formData);
    navigate("/login");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        {/* Basic Info */}
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

        {/* Currency Section */}
        <Typography variant="h6" gutterBottom>
          Currency Information
        </Typography>
        <TextField
          select
          label="Base Currency"
          name="currency.baseCurrency"
          variant="outlined"
          fullWidth
          value={formData.currency.baseCurrency}
          onChange={handleChange}
          required
        >
          {currencyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Additional Currencies (comma-separated)"
          name="currency.additionalCurrencies"
          variant="outlined"
          fullWidth
          value={formData.currency.additionalCurrencies}
          onChange={handleChange}
        />

        {/* Accounts Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Accounts
        </Typography>
        {formData.accounts.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.accounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        label="Name"
                        value={account.name}
                        onChange={(e) =>
                          handleAccountChange(index, "name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        label="Group"
                        value={account.group}
                        onChange={(e) =>
                          handleAccountChange(index, "group", e.target.value)
                        }
                        fullWidth
                      >
                        {accountGroups.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Balance"
                        type="number"
                        value={account.balance}
                        onChange={(e) =>
                          handleAccountChange(index, "balance", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeAccount(index)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
        <Button variant="outlined" onClick={addAccount}>
          Add Account
        </Button>
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
