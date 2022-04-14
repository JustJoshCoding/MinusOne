import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { useNavigate  } from "react-router-dom";
import {ProManageState} from '../../../../ProManageContext';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';


export default function SimpleAccordion() {

    const navigate = useNavigate();

    const handleGoAddToTimeline = () => {
            navigate(`/timelineadd`);
      }
    
    const { timeline } = ProManageState();



  return (

    
    <div>

        <Button 
        color="primary" 
        onClick={handleGoAddToTimeline}
        variant="contained">
            Add to Timeline
        </Button>
        {console.log(timeline)}
        
        
        {timeline.map((timelines) => { 
            return(
                
                // <Accordion>
                //     <AccordionSummary
                //     expandIcon={<ExpandMoreIcon />}
                //     aria-controls="panel1a-content"
                //     id="panel1a-header"
                //     >
                //         {timelines.title} 
                //         {/* <Box style={{float:'right'}}>
                //             Posted On: {timelines.dateCreated}
                //         </Box> */}
                        
                //     </AccordionSummary>
                //     <AccordionDetails >
                //         {timelines.description}
                //     </AccordionDetails>
                // </Accordion>

                <Timeline position='right' >
                    <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        Date Added: {timelines.dateCreated}
                    </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color='success'/>
                            <TimelineConnector />
                        </TimelineSeparator>
                            <TimelineContent>
                                <Box>
                                    <Card>
                                        <CardHeader
                                        title={timelines.title}
                                        />
                                        <CardContent>
                                            <Accordion>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                >
                                                    Expand
                                                    
                                                </AccordionSummary>
                                                <AccordionDetails >
                                                    {timelines.description}
                                                </AccordionDetails>
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </TimelineContent>
                    </TimelineItem>
                </Timeline>

                
                
            )
        })}
        
      
      
      
    </div>
  );
}