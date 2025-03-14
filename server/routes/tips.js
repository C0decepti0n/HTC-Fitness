/* eslint-disable no-console */
const express = require('express');
const { User, Tip } = require('../db/index'); 

const router = express.Router();


router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // users gender and intensity
        const { gender, intensity = 3 } = user; 

        // retrieve tips based on gender and intensity
        const tipEntry = await Tip.findOne({ gender, intensity });

        if (!tipEntry) {
            return res.status(404).json({ message: 'No tips found for this user' });
        }

        res.status(200).json({ tips: tipEntry.tips });
    } catch (error) {
        console.error('Error fetching tips:', error);
        res.status(500).json({ message: 'Error fetching tips' });
    }
});

// ✅ POST new tips for a user
router.post('/', async (req, res) => {
    const { userId, gender, intensity, tips } = req.body;

    try {
        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new tip entry
        const newTip = new Tip({ userId, gender, intensity, tips });
        await newTip.save();

        res.status(201).json({ message: 'Tips added successfully!', newTip });
    } catch (error) {
        console.error('Error adding tips:', error);
        res.status(500).json({ message: 'Error adding tips' });
    }
});

// ✅ PATCH (update) a user's tips
router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { gender, intensity, tips } = req.body;

    try {
        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find and update tip entry
        const updatedTip = await Tip.findOneAndUpdate(
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

// ✅ DELETE tips for a user
router.delete('/:userId/:tipId', async (req, res) => {
    const { userId, tipId } = req.params;

    try {
        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the tip entry
        const deletedTip = await Tip.findByIdAndDelete(tipId);

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