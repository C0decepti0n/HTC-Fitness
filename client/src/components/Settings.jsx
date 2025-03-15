import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';




const Settings = ({ user }) => {

  const [selectedBoxes, setSelectedBoxes] = useState({
    // default check values
    exerciseSuggestions: false, 
    weightCard: false,

  })

  //* GET on mount 
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`/api/settings/${user._id}`);
        // console.log(response.data[0].dashboard)
        const dashboardSettings = response.data[0].dashboard;
        console.log(dashboardSettings);
        setSelectedBoxes({
          exerciseSuggestions: dashboardSettings.includes('exerciseSuggestions'),
          weightCard: dashboardSettings.includes('weightCard'),
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, [user._id]);

  // const [patchedData, setPatchData] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    
    setSelectedBoxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    console.log(`Checkbox "${name}" is now:`, checked);
    // patchData({[name]: checked})
    // try {
    //   // Send update to server
    //   await axios.patch(`/api/users/${user.id}/settings`, {
    //     setting: name,
    //     action: checked ? 'add' : 'remove',
    //   });
    // } catch (error) {
    //   console.error('Dashboard preference update failed', error);

    //   // Rollback UI change if API call fails
    //   setSelectedBoxes((prevState) => {
    //     return { ...prevState, [name]: !checked };
    //   });
    // }
  }
  
  // patch request to server for client's preferences
  // const patchData = async (setting, isChecked, previousState) => {
  //   console.log('pathch', setting, isChecked)
  //   try {
  //     const response = await axios.patch(`/api/settings/${user._id}`, {
  //       setting,
  //       action: isChecked ? 'add' : 'remove',
  //     });
  //     console.log('updated user settigns', response.data)
  //   } catch(error) {
  //     console.error('Dashboard preference update failed', error)
  //     setSelectedBoxes(previousState);
  //   }
  // };

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
                checked={selectedBoxes.exerciseSuggestions}
                onChange={handleCheckboxChange}
                name="exercises-suggestions"
              />
            }
            label="Exercise Suggestions"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBoxes.weightCard}
                onChange={handleCheckboxChange}
                name="weight-card"
              />
            }
            label="Weight"
          />
      </Box>
    </Box>
  );
}

export default Settings;