const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const counts = await Candidate.aggregate([
      { $project: { name: 1, votes: 1 } }
    ]);
    res.send(counts);
  } catch (error) {
    console.error('Error getting vote counts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
