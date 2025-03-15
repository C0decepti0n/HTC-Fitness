import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';




const Settings = ({ user }) => {
  
  // Preferred Name
  const [prefName, setPrefName] = useState('');
  
  
  // Dashboard Settings
  const [dashboard, setDashboard] = useState([]);
  // Dashboard Preferences
  const [selectedBoxes, setSelectedBoxes] = useState({
    // default check values
    exerciseSuggestions: true, 
    weightCard: false,
  })

  //* GET Settings on mount 
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`/api/settings/${user._id}`);
        //* preferred name box *//
        setPrefName(response.data[0].prefName);
        console.log(prefName);
        //* dashboard checks *//
        const dashboardSettings = response.data[0].dashboard;
        setDashboard(dashboardSettings)
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

  // Event Handler
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    
    setSelectedBoxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    patchData(name, checked);
  }
  
  //* PATCH request to server for client's preferences
  const patchData = async (setting, isChecked) => {
    try {
      if (isChecked) {
        dashboard.push(setting)
      } else {
        const index = dashboard.indexOf(setting);
        dashboard.splice(index, 1);
      }
      const response = await axios.patch(`/api/settings/${user._id}`, {dashboard: dashboard});
      console.log('updated user settings', response.data)
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
                checked={selectedBoxes.exerciseSuggestions}
                onChange={handleCheckboxChange}
                name="exerciseSuggestions"
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