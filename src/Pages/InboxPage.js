import React, {useState } from 'react';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import {
  ThemeProvider,
  createTheme
} from "@material-ui/core";
import SubmissionTable from '../components/Inbox/SubmissionTable';

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [page, setPage] = useState(0);
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
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    PaperProps={{ style: {  marginTop: 70, color: "white", backgroundColor: '#16171a' } }}
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                    <List>

                      <ListItem button onClick={()=>setPage(0)}>
                        <ListItemIcon>
                          <InboxIcon style={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                      </ListItem>

                      <ListItem button onClick={()=>setPage(1)}>
                        <ListItemIcon>
                          <MailIcon style={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Rejected" />
                      </ListItem>

                      <ListItem button onClick={()=>setPage(2)}>
                        <ListItemIcon>
                          <InboxIcon style={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItem>

                      <ListItem button onClick={()=>setPage(3)}>
                        <ListItemIcon>
                          <MailIcon style={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                      </ListItem>

                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={()=>setPage(4)}>
                            <ListItemIcon>
                              <InboxIcon style={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary="More" />
                        </ListItem>
                    </List>
                    </Box>
                </Drawer>
                {page === 0 && <SubmissionTable/>}
                
            </Box>
        </ThemeProvider>
    );
}
