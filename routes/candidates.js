const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();

// GET route to fetch all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.send(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to add a new candidate
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const candidate = new Candidate({ name });
    await candidate.save();
    res.status(201).send(candidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE route to delete a candidate
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.send('Candidate deleted successfully');
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to fetch voting results
router.get('/results', async (req, res) => {
  try {
    const results = await Candidate.find().select('name votes');
    res.json(results);
  } catch (error) {
    console.error('Error getting vote counts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
