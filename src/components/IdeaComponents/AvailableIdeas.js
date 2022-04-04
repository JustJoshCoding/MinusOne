import { useState } from 'react';
import AddIdea from './AddIdea';

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
  { id: 'name', label: 'Name', minWidth: 80 },
  { id: 'description', label: 'Description', align: 'left', minWidth: 80 },
  { id: 'type', label: 'Type', align: 'left', minWidth: 49 },
];

const types = [
  {id: "tech", name: "Technical Computer Science or Information Technology Projects"},
  {id: "busi", name: "Business-Oriented Computer Science or Information Technology Projects"},
  {id: "reser", name: "Research Projects"},
  {id: "entr", name: "Entrepreneurial or Student-Proposed Projects"}
];

export default function AvailableIdeas() {
  const { user, isAdmin, setAlert, availIdeas, loading } = ProManageState();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handleSmartButton = async () => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userSkills = userSnap.data().skills;

    //max 50, min 10
    let tech = 0;
    let busi = 0;
    let reser = 0;
    let entr = 0;
    const difficulty = ['Easy','Medium','Hard'];

    if (user) {
      userSkills.map(skill => {
        // 1
        if (skill.skill === "Documentation") {
         
        }
        // 2
        if (skill.skill === "Web Design") {
          
        }
        // 3
        if (skill.skill === "Css") {
         
        }
        // 4
        if (skill.skill === "Programming") {
         
        }
        //5
        if (skill.skill === "Leadership") {
         
        }
        // 6
        if (skill.skill === "Database Management") {
          
        }
        // 7
        if (skill.skill === "Researching") {
          
        }
        // 8
        if (skill.skill === "Entrepreneur") {
          
        }
        // 9
        if (skill.skill === "Backend Development") {
          
        }
      })
      
        }
        else {
          setAlert({
            open: true,
            message: "please login to use this feature",
            type: "error",
          });
        }
  }

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
    return availIdeas.filter (
      (idea) => 
        idea.name.toString().toLowerCase().includes(searchValue) ||
        idea.type.toString().toLowerCase().includes(searchValue) 
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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