import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';




const Settings = () => {

  const [selectedBoxes, setSelectedBoxes] = useState({
    exercises: true,
    weightCard: false,

  })

  const [patchedData, setPatchData] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedBoxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
    console.log([name]);
  }
  
  // patch request to server for client's preferences
  const patchData = async () => {
    try {

    } catch(error) {
      console.error('Dashboard preference update failed', error)
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">
        Settings
      </Typography>
      <Divider />
       <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Dashboard Settings
        </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBoxes.exercises}
                onChange={handleCheckboxChange}
                name="exercises"
              />
            }
            label="Exercise Suggestions"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBoxes.weightCard}
                onChange={handleCheckboxChange}
                name="weightCard"
              />
            }
            label="Weight"
          />
      </Box>
    </Box>
  );
}

export default Settings;