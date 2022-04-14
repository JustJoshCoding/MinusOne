import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from '@material-ui/core';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';

import { useParams } from "react-router-dom";


import { db } from "../firebase";
import { getDoc, doc} from "firebase/firestore";

const theme = createTheme({
    typography: {
      fontFamily: 'Arial',
      fontSize: 12,
    },
});

export default function ViewGroupPage() {
    const { id } = useParams();
    const [groupInfo, setGroupInfo] = useState({
        Benefits: [],
        Duration: -1,
        beneficiaries: [],
        deliverables: [],
        objectives: [] ,
        projectScope: "",
        pojectType: "" ,
        stakeHolders: [],
        projectName: "",
    });

    
    const fetchGroup = async () => {
        const gRef = doc(db, "Groups", id);
        const gSnap = await getDoc(gRef);
        setGroupInfo(gSnap.data());
    }

    useEffect(() => {
        fetchGroup();
      })
    
    return (
        <ThemeProvider theme={theme}>
            <Container style={{ textAlign: "left" }}>
                <Box sx={{ m: 10}}>
                    <Card>
                        <CardHeader
                            sx={{ bgcolor: 'primary.main', color: 'white'}}
                            title={<Typography variant='h4'>{groupInfo.groupName}</Typography>}
                        />
                        <CardMedia
                            component="img"
                            height={500}
                            alt={groupInfo?.groupName}
                            image={groupInfo?.image}
                        />
                        <CardContent>
                            <Typography
                                variant='h4'
                            >
                                Project Name:
                            </Typography>
                            <br/>
                            {groupInfo.projectName !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                                {groupInfo.projectName}
                            </Typography>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <br/><br/>
                            <Typography
                                variant='h4'
                            >
                                Group Members:
                            </Typography>
                            {groupInfo.groupMembers ? 
                            <List>
                                {groupInfo.groupMembers.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${obj.firstname} ${obj.lastname}`} />
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
                                variant='h4'
                            >
                                Project Type:
                            </Typography>
                            <br/>
                            {groupInfo.projectType !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                                {groupInfo.projectType}
                            </Typography>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <br/><br/>
                            <Typography
                                variant='h4'
                            >
                                Project Scope:
                            </Typography>
                            <br/>
                            {groupInfo.projectScope !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                                width='800px'
                            >
                                {groupInfo.projectScope}
                            </Typography>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <br/><br/>
                            <Typography
                                variant='h4'
                            >
                                Objectives:
                            </Typography>
                            {(groupInfo.objectives.length !== 0 && groupInfo.objectives[0].Objective !== "") ? 
                            <List>
                                {groupInfo.objectives.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj} />
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
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                Description:
                            </Typography>
                            <br/>
                            {groupInfo.description !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                                width='800px'
                            >
                                {groupInfo.description}
                            </Typography>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <br/><br/>
                            <Typography
                                variant='h4'
                            >
                                Benefits:
                            </Typography>
                            <br/>
                            {(groupInfo.Benefits.length !== 0 && groupInfo.Benefits[0].Benefit !== "") ? 
                            <List>
                                {groupInfo.Benefits.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj} />
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
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                Beneficiaries:
                            </Typography>
                            <br/>
                            {(groupInfo.beneficiaries.length !== 0 && groupInfo.beneficiaries[0].Beneficiary !== "") ? 
                            <List>
                                {groupInfo.beneficiaries.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60 }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj} />
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
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                Stakeholders:
                            </Typography>
                            <br/>
                            {(groupInfo.stakeHolders.length !== 0 && groupInfo.stakeHolders[0].Stakeholder !== "")  ? 
                            <List>
                                {groupInfo.stakeHolders.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60 }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj} />
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
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                Deliverables:
                            </Typography>
                            <br/>
                            {(groupInfo.deliverables.length !== 0 && groupInfo.deliverables[0].Deliverable !== "" ) ? 
                            <List>
                                {groupInfo.deliverables.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60 }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj} />
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
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                Estimated Project Duration:
                            </Typography>
                            <br/>
                            {groupInfo.duration !== -1 ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                                {`${groupInfo.Duration} weeks`}
                            </Typography>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                Trello Board Link:
                            </Typography>
                            <br/>
                            {groupInfo?.trello !== undefined ? 
                            <a href={groupInfo?.trello}>
                                {groupInfo?.trello}
                            </a>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <br/>
                            <Typography
                                variant='h4'
                            >
                                GitHub Link:
                            </Typography>
                            <br/>
                            {groupInfo?.git !== undefined ? 
                            <a href={groupInfo?.git}>
                                {groupInfo?.git}
                            </a>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}