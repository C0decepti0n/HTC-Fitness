/* eslint-disable no-console */
const express = require('express');
const { User, Tips } = require('../db/index'); 
// change Tip to Tips line 22 example
const router = express.Router();
const mongoose = require("mongoose");


// const { ObjectId } = require("mongodb");

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        // first find user details
        const user = await Tips.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: "User tips not found" });
        }

        // now fetch tips based on gender and intensity
        const tipsData = await Tips.findOne({
            gender: user.gender, 
            intensity: user.intensity 
        });

        if (!tipsData) {
            return res.status(404).json({ message: "No tips available for this level" });
        }

        // pick a random tip
        const randomTip = tipsData.tips[Math.floor(Math.random() * tipsData.tips.length)];

        res.json({ tip: randomTip, intensity: user.intensity });
    } catch (error) {
        console.error('Error fetching tips:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST new tips for a user
router.post("/", async (req, res) => {
    try {
        const { userId, gender, intensity, tips } = req.body;

        // make sure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // use updateOne to update if exists or insert if not
        const updatedTips = await Tips.updateOne(
            { userId: userId },
            {
                $set: { gender, intensity, tips, disabled: false }
            },
            { upsert: true } // insert if it doesntt exist
        );

        res.status(200).json({ message: "Tips updated successfully", data: updatedTips });
    } catch (error) {
        console.error("Error updating tips:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// update gender or intensity
router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { gender, intensity } = req.body;

    try {
        if (!gender && intensity === undefined) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        let updatedTips = await Tips.findOneAndUpdate(
            { userId },
            { $set: { gender, intensity } },
            { new: true }
        );

        if (!updatedTips) {
            return res.status(404).json({ message: "User tips not found" });
        }

        // fetch new tips based on updated gender & intensity
        const newTips = await Tips.findOne({ gender, intensity });

        res.json({ message: "Updated successfully", newTips });
    } catch (error) {
        console.error("Error updating gender/intensity:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE tips for a user
router.delete('/:userId/:tipId', async (req, res) => {
    const { userId, tipId } = req.params;

    try {
        // validate that the user exists
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
// comment 
module.exports = router;