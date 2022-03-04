import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function MyList({ ideaName, ideaDescription }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper', color: 'text.primary' }} >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={ideaName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText sx={{ pl: 4 }}>
            <ListItemText primary={ideaDescription} secondary={<Button
                variant="contained"
                style={{
                width: 85,
                height: 40,
                marginLeft: 15,
                color: "black",
                backgroundColor: "#EEBC1D",
                float: "right"
                }}
            >
                Accept
            </Button>} />
          </ListItemText>
        </List>
      </Collapse>
    </List>
  );
}
