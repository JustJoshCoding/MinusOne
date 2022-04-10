import { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";

import { ProManageState } from '../../ProManageContext';
import { db } from '../../firebase';
import { getDoc, doc } from "firebase/firestore";

const columns = [
  { id: 'projectName', label: 'Name', minWidth: 80 },
  { id: 'description', label: 'Description', align: 'left', minWidth: 80 },
  { id: 'projectType', label: 'Type', align: 'left', minWidth: 49 },
];

const types = [
  {id: "tech", name: "Technical Computer Science or Information Technology Projects"},
  {id: "busi", name: "Business-Oriented Computer Science or Information Technology Projects"},
  {id: "reser", name: "Research Projects"},
  {id: "entr", name: "Entrepreneurial or Student-Proposed Projects"}
];

export default function AvailableIdeas() {
  const { currentAccProps, loading } = ProManageState();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles({
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
  });

  const search = () => {
    return currentAccProps.filter (
      (idea) => 
        idea.projectName.toString().toLowerCase().includes(searchValue) ||
        idea.description.toString().toLowerCase().includes(searchValue) ||
        idea.projectType.toString().toLowerCase().includes(searchValue)
    );
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <TextField
          label="Search For an Idea.."
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
                      <TableRow className={classes.row} role="checkbox" tabIndex={-1} key={row.code}>
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
          count={parseInt((search()?.length / 10).toFixed(0))}
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
    </ThemeProvider>
  );
}