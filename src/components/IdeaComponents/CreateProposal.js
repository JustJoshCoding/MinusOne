import { Box, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

const CreateProposal = () => {
    

    return (
        <Box
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
        type="text"
        label="Enter First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        fullWidth
        />
        <TextField
        variant="outlined"
        type="text"
        label="Enter Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        fullWidth
        />
        <TextField
        variant="outlined"
        type="number"
        label="Enter UWI ID number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        fullWidth
        />
        <br/>
        <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        />
        <br/>
        <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        />
    </Box>
    )
}

export default CreateProposal