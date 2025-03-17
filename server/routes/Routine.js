/* eslint-disable no-console */
const express = require('express');
const { Routine } = require('../db/index'); //ensure Routine is correctly imported

const router = express.Router();

// GET all routines for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching routines for user: ${userId}`);

  try {
    // Ensure the user exists
    // Fetch users routines
    const routines = await Routine.find({ userId });

    console.log(`Routines found: ${routines.length}`);
    res.status(200).json(routines);
  } catch (error) {
    console.error('Error fetching routines:', error);
    res.status(500).json({ message: 'Error fetching routines', error });
  }
});

// POST a new routine
router.post('/', async (req, res) => {
  const { userId, exercise, muscle, sets, reps, weight } = req.body;
  console.log(`Creating new routine for user: ${userId}`);

  try {
    const newRoutine = new Routine({
      userId,
      exercise,
      muscle,
      sets,
      reps,
      weight,
      createdAt: new Date(),
    });

    await newRoutine.save();
    console.log('Routine created successfully:', newRoutine);
    res.status(201).json(newRoutine);
  } catch (error) {
    console.error('Error creating routine:', error);
    res.status(500).json({ message: 'Error creating routine', error });
  }
});

// PATCH (update) an existing routine
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error('Error updating routine:', error);
    res.status(500).json({ message: 'Error updating routine', error });
  }
});

// DELETE a routine
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRoutine = await Routine.findByIdAndDelete(id);
    res.status(200).json({ message: 'Routine deleted successfully', deletedRoutine });
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({ message: 'Error deleting routine', error });
  }
});

module.exports = router;