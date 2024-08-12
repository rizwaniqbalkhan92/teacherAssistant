

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import { AutoGraph, Check, Notes, Settings } from '@mui/icons-material';
import CheckExam from './CheckExam';
import Prediction from './Prediction';
import CreateNotes from './CreateNotes';
import Setting from './Setting';
import ExampaperChecker from './ExampaperChecker';



export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);


  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
  
{
    value === 0 ? ( <ExampaperChecker/>) :value=== 1  ? (<CreateNotes/>): (<Setting/>)
}
     

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
    
          }}
        >
          <BottomNavigationAction label="Exam Check" icon={<Check />} />
          {/* <BottomNavigationAction label="Prediction" icon={<AutoGraph />} /> */}
          <BottomNavigationAction label="Create Notes" icon={<Notes />} />
          <BottomNavigationAction label="Setting" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

