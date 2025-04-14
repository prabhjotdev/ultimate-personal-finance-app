// src/pages/Accounts.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load current user data from localStorage on mount.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
      setAccounts(storedUser.accounts || []);
    }
  }, []);

  // When the Delete button is clicked.
  const handleDeleteClick = (index) => {
    setSelectedAccountIndex(index);
    setOpenDialog(true);
  };

  // Close the dialog without action.
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAccountIndex(null);
  };

  // Confirm deletion.
  const handleDeleteConfirm = () => {
    // For demo: update the accounts by removing the selected account.
    const updatedAccounts = accounts.filter(
      (_, i) => i !== selectedAccountIndex
    );

    // If you want to do something different depending on deletion option,
    // you can branch here (for now both options just remove the account).
    const updatedUser = { ...currentUser, accounts: updatedAccounts };

    // Update currentUser in localStorage and in the component state.
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setAccounts(updatedAccounts);
    handleDialogClose();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
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
            {accounts.map((account, index) => (
              <TableRow key={index}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.group}</TableCell>
                <TableCell>{account.balance}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Back to Dashboard Button */}
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this account? You can choose to delete the
            account and keep its transactions or delete both the account and its
            transactions.
          </DialogContentText>
          {/* For a more advanced demo, you could add radio buttons or a select here */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteConfirm}
            sx={{ mt: 1, mr: 1 }}
          >
            Delete Account (Keep Transactions)
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteConfirm}
            sx={{ mt: 1 }}
          >
            Delete Account (Delete Transactions)
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Accounts;
