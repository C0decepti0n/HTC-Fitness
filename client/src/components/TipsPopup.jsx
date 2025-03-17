import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';
import axios from 'axios';

const TipsPopup = ({ userId }) => {
    const [tip, setTip] = useState("");
    const [intensity, setIntensity] = useState(1);
    const [gender, setGender] = useState("male"); // default gender
    const [open, setOpen] = useState(true);

    // fetch the tip on mount & when intensity or gender changes
    useEffect(() => {
        if (userId) {
            fetchTips();
            setOpen(true);
        }
    }, [userId, intensity, gender]);

    // fetch tips from API
    const fetchTips = async () => {
        try {
            console.log("Fetching tips for userId:", userId);
            if (!userId || userId.length !== 24) {
                console.error("Invalid userId passed:", userId);
                return;
            }

            const response = await axios.get(`/api/tips/${userId}`);
            console.log("API Response:", response.data);

            if (response.data) {
                setTip(response.data.tip || "No tips available for this level.");
                setIntensity(response.data.intensity || 1);
                setGender(response.data.gender || "male"); // make sure the gender syncs
            }
        } catch (error) {
            console.error('Error fetching tips:', error);
            setTip("Error loading tips.");
        }
    };

    // increase intensity & fetch new tip
    const updateIntensity = async () => {
        if (intensity < 7) {
            try {
                const newIntensity = intensity + 1;
                const response = await axios.patch(`/api/tips/${userId}`, { intensity: newIntensity });

                console.log("Updated intensity:", response.data);
                setIntensity(newIntensity);
                fetchTips(); // fetch new tip immediately!!!
            } catch (error) {
                console.error('Error updating intensity:', error);
            }
        }
    };

    // toggle gender & update backend
    const updateGender = async () => {
        const newGender = gender === "male" ? "female" : "male";
        try {
            const response = await axios.patch(`/api/tips/${userId}`, { gender: newGender });

            console.log("Updated gender:", response.data);
            setGender(newGender);
            fetchTips(); // fetch new tip immediately after gender change!!
        } catch (error) {
            console.error('Error updating gender:', error);
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
                    {/* Gender Toggle Button */}
                    {/* <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={updateGender}
                    >
                        Switch to {gender === "male" ? "Female" : "Male"}
                    </Button> */}
                </Box>

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