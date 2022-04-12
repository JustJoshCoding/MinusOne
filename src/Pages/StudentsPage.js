import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";

// icons
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';

import { ProManageState } from '../ProManageContext';



const columns = [
  { id: 'firstname', label: 'First Name', minWidth: 50 },
  { id: 'lastname', label: 'Last Name', align: 'left', minWidth: 50 },
  { id: 'ID', label: 'Student ID', align: 'left', minWidth: 50 },
  { id: 'email', label: 'Email', align: 'left', minWidth: 60 },
  { id: 'degree', label: 'Degree', align: 'left', minWidth: 60 }
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
  }
}));

export default function StudentsPage() {
  const { loading, students } = ProManageState();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const navigate =useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const getStudents = () => {
    return students.filter ((student) =>  !student?.isAdmin)
  }

  const search = () => {
    return getStudents().filter (
      (student) =>
        `${student.firstname.toString().toLowerCase()} ${student.lastname.toString().toLowerCase()}`.includes(searchValue) ||
        student['ID'].toString().toLowerCase().includes(searchValue) ||
        student['email'].toString().toLowerCase().includes(searchValue) ||
        student['degree'].toString().toLowerCase().includes(searchValue)
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <LightbulbRoundedIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"            
            color= "gold"
            fontFamily= "Montserrat"
            fontWeight= "bold"
            sx={{ display: { xs: 'none', sm: 'block'} }}
          >
            Students Table
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
        <Container style={{ textAlign: "center" }}>
          <TextField
            label="Search For a Student"
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
                          onClick={() => navigate(`/userprofile/${row.ID}`)}
                          tabIndex={-1} 
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id} 
                                align={column.align}
                                component="th"
                                scope="row"
                                style={{
                                  gap: 15,
                                }}
                              >
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
            count={parseInt((search()?.length / 5).toFixed(0))}
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
        </Container>
      </Container>
    </ThemeProvider>
  );
} 