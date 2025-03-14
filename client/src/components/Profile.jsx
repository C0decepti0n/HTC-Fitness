import React, {useState, useEffect} from 'react';
import axios from 'axios'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const Profile = ({ user }) => {
  console.log(user._id)
  // mount user profile
  useEffect(() => {
    getProfile();
  }, [])
  // set profile state
  const [profile, setProfile] = useState([]);


  // axios get request
  const getProfile = () => {
    axios.get(`/${user._id}`)
    .then((response) => {
      setProfile(response.data)
    })
    .catch((err) => {
      console.log('Failed to find user data', err)
    })
  }

  const fillProfile = () => {

  }

  const [gender, setGender]= useState('');

  const saveName = (event) => {
    
    const prefName = (event.target.value);
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