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
  const [profile, setProfile] = useState([]);
  const [gender, setGender]= useState('');
  const [preferredName, setPreferredName]= useState('');

  // Call fetch request on page load
  useEffect(() => {
    getProfile();
  }, [])

  //* GET profile 
  const getProfile = () => {
    axios.get(`/api/settings/${user._id}`)
    .then((response) => {
      // setPreferredName = response.data[0].preferredName;
      setGender = response.data[0].gender;

    })
    .catch((err) => {
      console.log('Failed to find user data', err)
    })
  }

  //* Fill Profile *//
  const fillProfile = () => {

  }

  // Condtional logic if new user // 
  //* Patch  
  const saveName = (event) => {
    
    setPreferredName = event.target.value;
    // axios.patch('/settings/')
  }

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Paper>
      <Typography>
        User Profile
      </Typography>
      <TextField id="preferredName" label="Preferred Name" variant="outlined" onChange={saveName} />
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
          <MenuItem value={'non-binary'}>Non-Binary</MenuItem>
        </Select>
      </FormControl>
    </Paper>
    
  )
};

export default Profile;