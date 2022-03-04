import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import List from '../List';
import Button from '@mui/material/Button';
import AddIdea from './AddIdea';
import { ProManageState } from '../../ProManageContext';

const columns = [
  { id: 'name', label: 'Name', minWidth: 80 },
  { id: 'type', label: 'Type', align: 'left', minWidth: 49 },
];

function createData(name, type) {
  return { name, type };
}

const rows = [
  createData(<List ideaName="Online Auditorium" ideaDescription="create the worlds largest and most exciting online auditorium"/>, 'IN'),
  createData(<List ideaName="Online Auditorium" ideaDescription="create the worlds largest and most exciting online auditorium"/>, 'CN'),
  createData(<List ideaName="Online Auditorium" ideaDescription="create the worlds largest and most exciting online auditorium"/>, 'IT'),
  createData('United States', 'US'),
  createData('Canada', 'CA'),
  createData('Australia', 'AU'),
  createData('Germany', 'DE'),
  createData('Ireland', 'IE'),
  createData('Mexico', 'MX'),
  createData('Japan', 'JP'),
  createData('France', 'FR'),
  createData('United Kingdom', 'GB'),
  createData('Russia', 'RU'),
  createData('Nigeria', 'NG'),
  createData('Brazil', 'LOL'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { user } = ProManageState();

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{marginLeft: 180, marginRight: 180}}>
      {user && ( <AddIdea /> )}
      <Paper variant='elevation24' sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button variant="contained" color="primary">Smart</Button>
      </Paper>
    </div>
  );
}
