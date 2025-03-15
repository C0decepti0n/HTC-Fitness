import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, Dialog } from '@mui/material';
import axios from 'axios';

const TipsPopup = ({ userId }) => {
    const [tips, setTips] = useState([]);
    const [open, setOpen] = useState(true); // Set true to show immediately
    const [intensity, setIntensity] = useState(3);
    const [gender, setGender] = useState('male'); // Default gender


    // if gender is blank and ins
    useEffect(() => {
        if (userId) {
            fetchTips();
        }
    }, [userId, gender, intensity]);

    // Fetch tips based on userId, gender, and intensity
    const fetchTips = async () => {
        try {
            console.log("Fetching tips for userId:", userId);
            if (!userId || userId.length !== 24) {
                console.error("Invalid userId passed:", userId);
                return;
            }

            const response = await axios.get(`/api/tips/${userId}`, {
                params: { gender, intensity }
            });

            console.log("API Response:", response.data);
            setTips(response.data.tips || []);
        } catch (error) {
            console.error('Error fetching tips:', error);
        }
    };

    const handleGenderChange = async (event) => {
        setGender(event.target.value);
    };

    const handleIntensityChange = async (event) => {
        setIntensity(event.target.value);
    };

    const handleDeleteFeature = async () => {
        try {
            await axios.delete(`/api/tips/${userId}`);
            setTips([]);
            setOpen(false);
        } catch (error) {
            console.error('Error deleting tips feature:', error);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box p={3} textAlign='center'>
                <Typography variant='h6'>Daily Workout Tips</Typography>

                {tips.length > 0 ? (
            tips.map((tip, index) => (
                <Typography key={index} variant='body1'>- {tip}</Typography>
            ))
        ) : (
            <Typography variant='body2' color='error'>
                Loading tips... Please check your selection.
            </Typography>
        )}

                {/* Gender Selection */}
                <Box mt={2}>
                    <Typography variant='body2'>Select Gender:</Typography>
                    <Select value={gender} onChange={handleGenderChange}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </Box>

                {/* Intensity Selection */}
                <Box mt={2}>
                    <Typography variant='body2'>Adjust Workout Intensity:</Typography>
                    <Select value={intensity} onChange={handleIntensityChange}>
                        {[1, 2, 3, 4, 5, 6, 7].map(level => (
                            <MenuItem key={level} value={level}>{level}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mt={2}>
                    <Button variant='contained' onClick={() => setOpen(false)}>Close</Button>
                    <Button variant='outlined' color='error' onClick={handleDeleteFeature} sx={{ ml: 2 }}>
                        Disable Tips Feature
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default TipsPopup;