const express = require('express');
const router = express.Router();

const { User, Settings } = require('../db/index');
// const { Settings } = require('../db/Settings')

// GET the user's dashboard settings
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`GET request for userId: ${userId}`); 
  

  try {

    const settings = await Settings.findById({ user_id: userId });
    console.log('Settings found:', settings);  // Log the settings
    // send back the user's sleep records
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching user dashboard preferences:', error);
    res.status(500).json('Error fetching user dashboard preferences');
  }
});

router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const settings = req.body;
  console.log(`POST request for userId: ${userId} with settings:`, settings); 
  try {
    // reject request if the given user id is invalid
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // add the user id onto the sleepRecord object before it is used to make a new sleep record
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    settings.user_id = userId;

    // create new sleep record
    const newUserSettings = await Settings.create(settings);
    
    console.log('New user settings saved:', newUserSettings);  //
    res.json({ message: 'new user saved', newUserSettings });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'error saving user', error });
  }
});

module.exports = router;