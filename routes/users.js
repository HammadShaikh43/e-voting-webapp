// users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    // console.log('check1')
    const users = await User.find({});
    // console.log('check2')
    // console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});


// DELETE a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    // Remove the user
    await User.findByIdAndRemove(userId);
    res.status(200).send('User removed successfully');
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
