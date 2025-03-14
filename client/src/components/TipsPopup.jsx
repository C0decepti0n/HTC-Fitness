import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, Dialog } from '@mui/material';
import axios from 'axios';

const TipsPopup = ({ userId }) => {
    const [tips, setTips] = useState([]);
    const [open, setOpen] = useState(true);
    const [intensity, setIntensity] = useState(3); // Default intensity

   
    useEffect(() => {
        if (userId) {
            fetchTips();
        }
    }, [userId]);

    
    const fetchTips = async () => {
        try {
            console.log("Fetching tips for userId:", userId);

            if (!userId || userId.length !== 24) {
                console.error("Invalid userId passed:", userId);
                return;
            }

            const response = await axios.get(`/api/tips/${userId}`);
            console.log("API Response:", response.data);

            setTips(response.data.tips || []);
        } catch (error) {
            console.error('Error fetching tips:', error);
        }
    };

    const handleIntensityChange = async (event) => {
        const newIntensity = event.target.value;
        setIntensity(newIntensity);
        try {
            await axios.patch(`/api/tips/${userId}/intensity`, { intensity: newIntensity });
            fetchTips();
        } catch (error) {
            console.error('Error updating intensity:', error);
        }
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
                        <Typography key={index} variant='body1'>{tip}</Typography>
                    ))
                ) : (
                    <Typography>No tips available</Typography>
                )}

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