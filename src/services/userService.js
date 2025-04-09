// src/services/userService.js

const STORAGE_KEY = "users";

// Helper to load users from localStorage; if none exist, initialize with a sample user.
function loadUsers() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  // If no data, initialize with an empty array or load from public/users.json if needed.
  // For simplicity, we'll initialize with an empty array.
  const sampleUsers = [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleUsers));
  return sampleUsers;
}

// Helper to save users to localStorage.
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Public API functions
export function getUsers() {
  return loadUsers();
}

export function getUserByEmail(email) {
  const users = loadUsers();
  return users.find((user) => user.email === email);
}

export function addUser(user) {
  const users = loadUsers();
  // Generate a unique id (demo purposes)
  const newUser = { ...user, id: String(Date.now()) };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

// Function to update a user's password
export function updateUserPassword(email, newPassword) {
  let users = loadUsers();
  const userIndex = users.findIndex((user) => user.email === email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    saveUsers(users);
    return true;
  }
  return false;
}
