import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import EventTracker from '../components/Dashboard/ShowEventTracker/EventTracker';
import Timeline from '../components/Dashboard/ShowEventTracker/Timeline/Timeline'
import { Container } from '@material-ui/core';
import { ProManageState } from '../ProManageContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
    const [value, setValue] = React.useState([null, null]);
    const { user } = ProManageState();

    var showUpcommingEvents = (
        <React.Fragment>
            <EventTracker/>
        </React.Fragment>
    );
    var showCalendar = (
        <React.Fragment>
            <CardContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDateRangePicker
                        displayStaticWrapperAs="desktop"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                        </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </CardContent>
        </React.Fragment>
    );

    var showTimeline = (
        <React.Fragment>
            <CardContent>
                <Typography variant='h5' color="text.primary">
                    My Timeline
                    <Timeline/>
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Container style={{ textAlign: "center" }}>
            <Box sx={{ flexGrow: 1}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <DashboardIcon />
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
                    Dashboard
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            
                <Grid container spacing={{ xs: 5, md: 3 }} columns={{ xs: 8, sm: 8, md: 8 }} >
                    <Grid item xs={8} >
                        <Item>{showUpcommingEvents}</Item>
                    </Grid>

                    <Grid item xs={8}  >
                        <Item>{showCalendar}</Item>
                    </Grid>
                    <Grid item xs={8} >

                        {user && <Item>{showTimeline}</Item>}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
