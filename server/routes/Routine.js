
const mongoose = require('mongoose');
const express = require('express');


const router = express.Router();


// GET all routines for a user
router.get('/:userId', async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.params.userId });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routines', error });
  }
});

// POST a new routine
router.post('/', async (req, res) => {
  try {
    const { userId, exercise, muscle, sets, reps, weight } = req.body;
    if (!userId || !exercise || !muscle || !sets || !reps || !weight) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newRoutine = new Routine({ userId, exercise, muscle, sets, reps, weight });
    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(500).json({ message: 'Error creating routine', error });
  }
});

// PATCH (update) an existing routine
router.patch('/:id', async (req, res) => {
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.json(updatedRoutine);
  } catch (error) {
    res.status(500).json({ message: 'Error updating routine', error });
  }
});

// DELETE a routine
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoutine = await Routine.findByIdAndDelete(req.params.id);
    if (!deletedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting routine', error });
  }
});

module.exports = router;

