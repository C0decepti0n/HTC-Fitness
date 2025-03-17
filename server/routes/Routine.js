/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
// ensure Routine is imported
const { User, Routine } = require('../db/index'); 
const mongoose = require('mongoose');


//GET all routines for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching routines for user:", userId); // debugging log

  try {
    //validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid userId:", userId);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    //check if user exists
    const user = await User.findById(userId);
    if (!user) {
      console.warn("User not found:", userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // fetch routines
    const routines = await Routine.find({ userId });
    if (routines.length === 0) {
      console.warn("No routines found for user:", userId);
      return res.status(404).json({ message: 'No routines found' });
    }

    //debugging log
    console.log("Returning routines:", routines); 
    res.status(200).json(routines);
  } catch (error) {
    console.error('Error fetching routines:', error);
    res.status(500).json({ message: 'Error fetching routines', error });
  }
});

module.exports = router;


// POST a new routine for a user
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const routineData = req.body;

  try {
    // verify if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // attach userId to routine before saving
    routineData.userId = userId;
    const newRoutine = await Routine.create(routineData);

    res.status(201).json({ message: 'Routine saved successfully', newRoutine });
  } catch (error) {
    console.error('Error saving routine:', error);
    res.status(500).json({ message: 'Error saving routine', error });
  }
});

// PATCH (update) a routine
router.patch('/:userId/:routineId', async (req, res) => {
  const { userId, routineId } = req.params;
  const updatedRoutineData = req.body;

  try {
    // Verify if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the specified routine
    const updatedRoutine = await Routine.findByIdAndUpdate(routineId, updatedRoutineData, { new: true });
    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.status(200).json({ message: 'Routine updated successfully', updatedRoutine });
  } catch (error) {
    console.error('Error updating routine:', error);
    res.status(500).json({ message: 'Error updating routine', error });
  }
});

// DELETE a routine
router.delete('/:userId/:routineId', async (req, res) => {
  const { userId, routineId } = req.params;

  try {
    // verify if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the specified routine
    const deletedRoutine = await Routine.findByIdAndDelete(routineId);
    if (!deletedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.status(200).json({ message: 'Routine deleted successfully', deletedRoutine });
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({ message: 'Error deleting routine', error });
  }
});

module.exports = router;
