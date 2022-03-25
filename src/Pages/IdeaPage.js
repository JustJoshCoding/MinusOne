import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import AvailableIdeas from '../components/IdeaComponents/AvailableIdeas';
import PastAcceptedPropsals from '../components/IdeaComponents/PastAcceptedPropsals';
import CurrAccProposals from '../components/IdeaComponents/CurrAccProposals';

const IdeaPage = () => {
  // set states
  const [value, setValue] = useState('one');

  // handle functions
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <div>
    <Typography align='center' mt={3} variant="h4" component="h5">
      Idea Development
    </Typography>
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        centered
        onChange={handleChange}
        textColor="white"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Available Ideas" />
        <Tab value="two" label="Current Accepted Proposals" />
        <Tab value="three" label="Past Accepted Proposals" />
      </Tabs>
      {value === "one" && <AvailableIdeas/>}
      {value === "two" && <CurrAccProposals/>}
      {value === "three" && <PastAcceptedPropsals/>}
    </Box>
  </div>
  );
  
}

export default IdeaPage