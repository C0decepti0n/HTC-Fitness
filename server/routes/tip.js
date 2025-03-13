
const express = require('express');

const router = express.Router();

// GET tips based on gender and intensity from MongoDB
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await user.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { gender, intensity = 3 } = user;
    const tipEntry = await Tip.findOne({ gender, intensity });

    if (!tipEntry) {
      return res.json({ tips: ['Stay active!'] });
    }

    res.json({ tips: tipEntry.tips });
  } catch (error) {
    console.error('Error getting tips:', error);
    res.status(500).json({ message: 'Error getting tips' });
  }
});

//  POST new tips for a user
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender, intensity, tips } = req.body;

    // validate the user
    const user = await user.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // create a new tip entry
    const newTip = new Tip({ userId, gender, intensity, tips });
    await newTip.save();

    res.status(201).json({ message: 'Tips added successfully!', newTip });
  } catch (error) {
    console.error('Error adding tips:', error);
    res.status(500).json({ message: 'Error adding tips' });
  }
});

// PATCH update a user's tips 
router.patch('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender, intensity, tips } = req.body;

    // find and update the tip entry
    const updatedTip = await Tip.findOneAndUpdate(
      { userId, gender, intensity },
      { tips },
      { new: true, upsert: true }
    );

    res.json({ message: 'Tips updated successfully!', updatedTip });
  } catch (error) {
    console.error('Error updating tips:', error);
    res.status(500).json({ message: 'Error updating tips' });
  }
});

// DELETE tips for a specific user, gender, and intensity
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender, intensity } = req.body;

    const deletedTip = await Tip.findOneAndDelete({
      userId,
      gender,
      intensity,
    });

    if (!deletedTip) {
      return res.status(404).json({ message: 'No tips found to delete' });
    }

    res.json({ message: 'Tips deleted successfully!' });
  } catch (error) {
    console.error('Error deleting tips:', error);
    res.status(500).json({ message: 'Error deleting tips' });
  }
});

//comment
module.exports = router;

