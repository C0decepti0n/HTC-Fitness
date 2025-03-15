import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';
import axios from 'axios';

const TipsPopup = ({ userId }) => {
    const [tips, setTips] = useState([]);
    const [open, setOpen] = useState(true); // pop up immediately

    useEffect(() => {
        if (userId) {
            fetchTips();
            setOpen(true); //  popup immediately on page load this will change after it renders through whole app 
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

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box p={3} textAlign='center'>
                <Typography variant='h6'>Daily Workout Tips</Typography>

                {/*  dynamically display tips */}
                {tips.length > 0 ? (
                    tips.map((tip, index) => (
                        <Typography key={index} variant='body1'>- {tip}</Typography>
                    ))
                ) : (
                    <Typography variant='body2' color='error'>
                        Loading tips... Please check your profile settings.
                    </Typography>
                )}

                <Box mt={2}>
                    <Button variant='contained' onClick={() => setOpen(false)}>Close</Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default TipsPopup;