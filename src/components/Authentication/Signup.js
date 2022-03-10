import { Box, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    renderSignUp: (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography >Please fill out the fields below:</Typography>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
       <TextField
        variant="outlined"
        type="name"
        label="Enter First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="email"
        label="Enter Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
    </Box>
  )}
};

export default Signup;
