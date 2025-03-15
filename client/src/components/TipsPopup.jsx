import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';
import axios from 'axios';

const TipsPopup = ({ userId }) => {
    const [tip, setTip] = useState("");
    const [intensity, setIntensity] = useState(1);
    const [open, setOpen] = useState(true);

    // fetch the tip on mount & when intensity changes
    useEffect(() => {
        if (userId) {
            fetchTips();
            setOpen(true);
        }
    }, [userId, intensity]);

    // fetch the tips based on userId
    const fetchTips = async () => {
        try {
            console.log("Fetching tips for userId:", userId);
            if (!userId || userId.length !== 24) {
                console.error("Invalid userId passed:", userId);
                return;
            }

            const response = await axios.get(`/api/tips/${userId}`);
            console.log("API Response:", response.data);

            if (response.data && response.data.tip) {
                setTip(response.data.tip); // set the fetched tip
                setIntensity(response.data.intensity || 1); // set intensity
            } else {
                setTip("No tips available for this level.");
            }
        } catch (error) {
            console.error('Error fetching tips:', error);
            setTip("Error loading tips.");
        }
    };

    // update the intensity & fetch a new tip
    const updateIntensity = async () => {
        if (intensity < 7) {
            try {
                const newIntensity = intensity + 1;
                const response = await axios.patch(`/api/tips/${userId}`, { intensity: newIntensity });

                console.log("Updated intensity:", response.data);
                setIntensity(newIntensity);

                fetchTips(); // fetch new tip immediately!!!!
            } catch (error) {
                console.error('Error updating intensity:', error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box p={3} textAlign="center">
                <Typography variant="h6">Daily Workout Tip</Typography>

                {/* Display one random tip */}
                <Typography variant="body1" mt={2}>
                    {tip || "Loading tips..."}
                </Typography>

                <Typography variant="body2">Current Intensity: {intensity}</Typography>

                <Box mt={2}>
                    {/* Increase Intensity Button (Disable at max level 7) */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={updateIntensity} 
                        disabled={intensity >= 7}
                    >
                        Increase Intensity
                    </Button>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default TipsPopup;