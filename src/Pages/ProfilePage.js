import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { ProManageState } from '../ProManageContext';
import { Box } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const ProfilePage = () => {
    const { user } = ProManageState();
    const [isClicked, setIsClicked] = useState(false);
   

    return (
        <Box sx={{ flexGrow: 1, margin: 180, paddingTop: '50px'}}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={8} sx={{ alignContent: 'center', alignItems: 'center'}}>
                    <CardContent sx={{ minWidth: 275 }}>
                        <Avatar sx={{ width: 100, height: 100 }} />
                        <Typography variant='h4' >{ user.displayName }</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex'}}>
                    <CardContent>
                        <Typography variant='h5' >User Details</Typography>
                        <Typography mt={5} variant='subtitle1' >Email: { user.email }</Typography>
                    </CardContent>
                </Grid>
                {isClicked && <Grid xs={8}>
                    <CardContent sx={{marginLeft: 5 }}>
                        <Typography variant='h5' >Skills</Typography>
                        
                    </CardContent>
                </Grid>}
                <Grid item xs={4}>
                    { !isClicked? <CardActions sx={{marginLeft: 5 }}>
                        <Button
                            size="small"
                            onClick={setIsClicked(true)}
                        >
                            Show Skills
                        </Button>
                    </CardActions> : <CardActions sx={{marginLeft: 5 }}>
                        <Button
                            size="small"
                            onClick={setIsClicked(false)}
                        >
                            Hide
                        </Button>
                    </CardActions>}
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfilePage