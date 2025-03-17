/* eslint-disable no-console */
const express = require('express');
const { User, Tips } = require('../db/index'); 
// change Tip to Tips line 22 example
const router = express.Router();
const mongoose = require("mongoose");




router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        // first find user details
        const user = await Tips.findOne({ userId: userId });
        router.get('/api/tips/:userId', async (req, res) => {
            try {
                const { userId } = req.params;
                const userTips = await db.collection('tips').findOne({ userId: ObjectId(userId) });
        
                if (!userTips) {
                    // and if no tips exist for the user then create default tips
                    const defaultTips = {
                        userId: ObjectId(userId),
                        // default gender
                        gender: "male",
                        // default intensity 
                        intensity: 1, 
                        // default to enabled
                        tipsEnabled: true, 
                    };
        
                    await db.collection('tips').insertOne(defaultTips);
                    // return the default tips
                    return res.json(defaultTips); 
                }
        
                res.json(userTips);
            } catch (error) {
                console.error("Error fetching tips:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User tips not found" });
        }

        // now get tips based on gender and intensity
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
            // insert if it doesntt exist
            { upsert: true } 
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

        // get new tips based on updated gender & intensity
        const newTips = await Tips.findOne({ gender, intensity });

        res.json({ message: "Updated successfully", newTips });
    } catch (error) {
        console.error("Error updating gender/intensity:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE tips for a user
router.delete('/:userId', async (req, res) => {
    try {
        // extract the userId from URL
        const { userId } = req.params; 
        console.log("Deleting tips for userId:", userId);

        const deletedTip = await Tips.findOneAndDelete({ userId });

        if (!deletedTip) {
            return res.status(404).json({ message: 'Tips not found for this user' });
        }

        res.json({ message: 'Tips deleted successfully' });
    } catch (error) {
        console.error('Error deleting tips:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;