import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    InputLabel, MenuItem, FormControl, Select, Box, Button,
    Typography, Paper, TextField
} from '@mui/material';

const Profile = ({ user }) => {
  console.log(user)
    //* States *//
    const [gender, setGender] = useState('');
    const [intensity, setIntensity] = useState(3); // Default intensity
    const [tipsEnabled, setTipsEnabled] = useState(true); // Track tips feature

    //* Fetch user profile data from backend on page load *//
    useEffect(() => {
        if (user?._id) {
            getProfile();
        }
    }, [user]);

    const getProfile = async () => {
        try {
            const response = await axios.get(`/api/tips/${user._id}`);
            if (response.data) {
                setGender(response.data.gender || '');
                setIntensity(response.data.intensity || 3);
                setTipsEnabled(response.data.tipsEnabled !== false); // Default true
            }
        } catch (err) {
            console.error('Failed to fetch user data', err);
        }
    };

    //* Handle Gender Change *//
    const handleGenderChange = async (event) => {
        const newGender = event.target.value;
        setGender(newGender);

        try {
            await axios.patch(`/api/tips/${user._id}`, { gender: newGender });
        } catch (error) {
            console.error('Error updating gender:', error);
        }
    };

    //* Handle Intensity Change *//
    const handleIntensityChange = async (event) => {
        const newIntensity = event.target.value;
        setIntensity(newIntensity);

        try {
            await axios.patch(`/api/tips/${user._id}`, { intensity: newIntensity });
        } catch (error) {
            console.error('Error updating intensity:', error);
        }
    };

    //* Disable Tips Feature *//
    const handleDisableTips = async () => {
        setTipsEnabled(false); // Disable locally

        try {
            await axios.patch(`/api/tips/${user._id}`, { tipsEnabled: false });
        } catch (error) {
            console.error('Error disabling tips:', error);
        }
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h5">User Profile</Typography>

            {/* Gender Selection */}
            <FormControl sx={{ m: 2, minWidth: 150 }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    value={gender}
                    label="Gender"
                    onChange={handleGenderChange}
                >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                </Select>
            </FormControl>

            {/* Intensity Selection */}
            <FormControl sx={{ m: 2, minWidth: 150 }}>
                <InputLabel id="intensity-label">Intensity</InputLabel>
                <Select
                    labelId="intensity-label"
                    id="intensity-select"
                    value={intensity}
                    label="Intensity"
                    onChange={handleIntensityChange}
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                        <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Disable Tips Feature */}
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDisableTips}
                    disabled={!tipsEnabled}
                >
                    {tipsEnabled ? "Disable Tips Feature" : "Tips Disabled"}
                </Button>
            </Box>
        </Paper>
    );
};

export default Profile;