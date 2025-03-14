/* eslint-disable no-console */
const express = require('express');
const { User, Tips } = require('../db/index'); 
// change Tip to Tips line 22 example
const router = express.Router();


router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // users gender and intensity
        const { gender, intensity = 3 } = user; 

        // retrieve tips based on gender and intensity
        const tipEntry = await Tips.findOne({ gender, intensity });

        if (!tipEntry) {
            return res.status(404).json({ message: 'No tips found for this user' });
        }

        res.status(200).json({ tips: tipEntry.tips });
    } catch (error) {
        console.error('Error fetching tips:', error);
        res.status(500).json({ message: 'Error fetching tips' });
    }
});

// POST new tips for a user
router.post('/', async (req, res) => {
    const { userId, gender, intensity, tips } = req.body;

    try {
        // validate that user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // create new tip entry
        const newTip = new Tips({ userId, gender, intensity, tips });
        await newTip.save();

        res.status(201).json({ message: 'Tips added successfully!', newTip });
    } catch (error) {
        console.error('Error adding tips:', error);
        res.status(500).json({ message: 'Error adding tips' });
    }
});

// PATCH a user's tips
router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { gender, intensity, tips } = req.body;

    try {
        // validate that user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // find and update tip entry
        const updatedTip = await Tips.findOneAndUpdate(
            { userId, gender, intensity },
            { tips },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Tips updated successfully!', updatedTip });
    } catch (error) {
        console.error('Error updating tips:', error);
        res.status(500).json({ message: 'Error updating tips' });
    }
});

// DELETE tips for a user
router.delete('/:userId/:tipId', async (req, res) => {
    const { userId, tipId } = req.params;

    try {
        // validate that user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // delete the tip entry
        const deletedTip = await Tips.findByIdAndDelete(tipId);

        if (!deletedTip) {
            return res.status(404).json({ message: 'No tips found to delete' });
        }

        res.status(200).json({ message: 'Tips deleted successfully!', deletedTip });
    } catch (error) {
        console.error('Error deleting tips:', error);
        res.status(500).json({ message: 'Error deleting tips' });
    }
});

module.exports = router;