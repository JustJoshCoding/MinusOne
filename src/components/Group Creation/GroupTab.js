import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import AddGroup from './AddGroup';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse } from '@material-ui/core';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

  

export default function BasicGrid() {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const card = (
    <React.Fragment>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "gold" }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Name From Database"
        subheader="Date"
        />
        
      <CardContent>
        {
        <Typography variant="h6" component="div">
          Number of Members
        </Typography>
        }
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
          </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Lists Name of Members</Typography>
              </CardContent>
            </Collapse>
          
    </React.Fragment>
  );
    
  return (
    
    
    <Box sx={{ flexGrow: 1 }}>
      <AddGroup />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12.5}} >
        {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
                <Item>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">{card}</Card>
                    </Box>
                </Item>
            </Grid>
        ))}
        
      </Grid>
    </Box>
  );
}