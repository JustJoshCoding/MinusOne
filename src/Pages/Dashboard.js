import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import EventTracker from '../components/Dashboard/ShowEventTracker/EventTracker';
import Timeline from '../components/Dashboard/ShowEventTracker/Timeline/Timeline'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
    const [value, setValue] = React.useState([null, null]);

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
        <Box sx={{ m: 20}}>
            <Grid container spacing={{ xs: 5, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                <Grid item xs={5} >
                    <Item>{showUpcommingEvents}</Item>
                </Grid>
                <Grid item xs={5} md={7} >
                    <Item>{showCalendar}</Item>
                </Grid>
                <Grid item xs={10}>
                    <Item>{showTimeline}</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
