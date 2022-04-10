import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  TableCell,
  TextField,
  TableBody,
  TableRow,
  ThemeProvider,
  createTheme,
  TableHead,
  TableContainer,
  Table,
  Paper,
  LinearProgress
} from "@material-ui/core";

const columns = [
    { id: 'fullname', label: 'From', minWidth: 80 },
    { id: 'studentID', label: 'Student ID', align: 'left', minWidth: 80 },
    { id: 'received', label: 'Received', align: 'left', minWidth: 49 },
];
  
  
const useStyles = makeStyles((theme) => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "500px",
      backgroundColor: theme.palette.background.paper,
      color: "white",
      borderRadius: 10,
    },
}));


const SubmissionTable = () => {
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [pendingProposals, setPendingProposals] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const navigate =useNavigate();

    // get pending proposals
    const getPendingProposals = async  () => {
        const pendRef = collection(db, "Pending Proposals");
        setLoading(true);
        const data = await getDocs(pendRef);
        if (data) {
            setPendingProposals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        }
        else {
            console.log("No proposals pending");
        }
    };

    useEffect(() => {
      getPendingProposals();
    }, [])

    const search = () => {
        return pendingProposals.filter (
        (prop) => 
            prop.studentID.toString().toLowerCase().includes(searchValue) ||
            prop.fullname.toString().toLowerCase().includes(searchValue) 
        );
    }

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Toolbar />
                <TextField
                label="Search For a Proposal.."
                variant="outlined"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearchValue(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {loading ? (
                    <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (
                    <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                                color: "black",
                                fontWeight: "700",
                                fontFamily: "Montserrat",
                            }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {search()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((row) => {
                            return (
                            <TableRow
                                className={classes.row}
                                tabIndex={-1} 
                                key={row.code}
                                onClick={() => navigate(`/studentproposal/${row.id}`)}
                            >
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' 
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                                
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                    )}
                </TableContainer>
                <Pagination
                count={parseInt((search()?.length / 100).toFixed(0))}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
                />
            </Box>
        </ThemeProvider>
    )
}

export default SubmissionTable