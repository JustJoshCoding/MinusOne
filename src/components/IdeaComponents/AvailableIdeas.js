import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AddIdea from './AddIdea';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ProManageState } from '../../ProManageContext';
import { Box } from '@material-ui/core';
import { db } from '../../firebase';
import { getDoc, doc } from "firebase/firestore";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

export default function StickyHeadTable() {
  const { user, isAdmin, availIdeas, setAlert } = ProManageState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  
  //console.log("available ideas: ", availIdeas);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleSelectIdea = () => {
    
  }

  return (
    <Box sx={{ marginLeft: 180, marginRight: 180}}>
      {isAdmin && ( <AddIdea /> )}
      <br/>
      <Paper variant='elevation24' sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">

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
              {availIdeas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={handleSelectIdea}>
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
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={availIdeas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button onClick={handleSmartButton} variant="contained" color="primary">Smart</Button>
      </Paper>
    </Box>
  );
}
