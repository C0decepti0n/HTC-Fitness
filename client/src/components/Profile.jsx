import React, {useState, useEffect} from 'react';
import axios from 'axios'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Grid from '@mui/system/Grid'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const Profile = ({ user }) => {
  
  //* States *//
  // const [profile, setProfile] = useState([]); // not sure if needed
  const [gender, setGender]= useState('');
  // state about intensity
  

  // Call fetch request on page load
  useEffect(() => {
    getProfile();
  }, [])

  //* GET profile 
  const getProfile = () => {
    axios.get(`/api/tips/${user._id}`)
    .then((response) => {
      
      setGender = response.data[0].gender;

    })
    .catch((err) => {
      console.log('Failed to find user data', err)
    })
  }

  //* Fill Profile from get *//
  const fillProfile = () => {

  }

  
  //* Patch  
 

  const handleChange = (event) => {
    //change intensity
    // intensity (event.target.value);
  };

  return (
    <Paper>
      <Typography>
        User Profile
      </Typography>
      {/* Add something about intensity */}
      {/* Option to disable tips check box */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender-select"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
         
        </Select>
      </FormControl>
    </Paper>
    
  )
};

export default Profile;