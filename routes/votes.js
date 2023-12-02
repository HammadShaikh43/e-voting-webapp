const express = require('express');
const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate');
const User = require('../models/User');
const router = express.Router();

// POST route to record a vote
router.post('/', async (req, res) => {
  try {
    const { userId, candidateId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).send('Invalid user or candidate ID');
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send('User not found');
    }
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(400).send('Candidate not found');
    }
    const existingVote = await Vote.findOne({ user: userId });
    if (existingVote) {
      return res.status(400).send('User has already voted');
    }
    candidate.votes += 1;
    candidate.voters.push(userId);
    await candidate.save();
    const vote = new Vote({ user: userId, candidate: candidateId });
    await vote.save();
    res.status(201).send('Vote counted');
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT route to reset vote for a specific user
router.put('/reset/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await Vote.deleteMany({ user: userId });
    await Candidate.updateMany({}, { $pull: { voters: userId } });
    res.status(200).send('Vote reset successfully for the user.');
  } catch (error) {
    console.error('Error resetting vote for the user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT route to reset votes for all users
router.put('/reset-all', async (req, res) => {
  try {
    await Vote.deleteMany({});
    await Candidate.updateMany({}, { $set: { votes: 0 }, $pullAll: { voters: [] } });
    res.status(200).send('Votes reset successfully for all users.');
  } catch (error) {
    console.error('Error resetting votes for all users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
