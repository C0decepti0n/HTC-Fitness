const express = require('express');
const router = express.Router();

const { User } = require('../db/index');
const { Settings } = require('../db/Settings')

// GET the user's dashboard settings
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {

    const settings = await Settings.find({ user_id: userId });
    
    // send back the user's sleep records
    res.status(200).json(settings.dashboard);
  } catch (error) {
    console.error('Error fetching user dashboard preferences:', error);
    res.status(500).json('Error fetching user dashboard preferences');
  }
});

module.exports = router;