import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { Box } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';

import { CardHeader } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { Card } from '@mui/material';

import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs} from "firebase/firestore";


const ProfilePage = () => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});

    const fetchUserProfile = async () => {
        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);
        usersSnap.docs.map((doc) => {
            if (doc.data().ID === id){
                setUserInfo(doc.data());
                return;
            }
        });
    }

    useEffect(() => {
        fetchUserProfile();
      }, [userInfo])

    return (
        <Box sx={{ flexGrow: 1, margin: 180, paddingTop: '50px'}}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={8} sx={{ alignContent: 'center', alignItems: 'center'}}>
                    <Card>
                        <CardHeader
                            sx={{ bgcolor: 'primary.main', color: 'white'}}
                            title={<Typography variant='h4'>{`${userInfo.firstname} ${userInfo.lastname}`}</Typography>}
                            avatar={
                                <Avatar
                                    alt={`${userInfo.firstname} ${userInfo.lastname}`}
                                    src=""
                                    sx={{ width: 120, height: 120 }}
                                />
                            }
                            
                            subheader={`Email: ${userInfo.email}`}
                        />
                        <CardContent>
                            <Typography
                                variant='h4'
                            >
                               Skills:
                            </Typography>
                            {userInfo.skills ? 
                            <List>
                                {userInfo.skills.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj.skill} />
                                    </ListItem >
                                )})}
                            </List>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <Typography
                                variant='h6'
                            >
                                {`Group: ${userInfo?.groupName}`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfilePage