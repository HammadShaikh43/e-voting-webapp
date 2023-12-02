const express = require('express');
const VotingSession = require('../models/VotingSession');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const newSession = new VotingSession({ name });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error creating voting session:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/start/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await VotingSession.findByIdAndUpdate(id, { status: 'ongoing' });
    res.send('Voting session started');
  } catch (error) {
    console.error('Error starting voting session:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/end/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await VotingSession.findByIdAndUpdate(id, { status: 'ended' });
    res.send('Voting session ended');
  } catch (error) {
    console.error('Error ending voting session:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/publish/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await VotingSession.findByIdAndUpdate(id, { resultsPublished: true });
    res.send('Results published');
  } catch (error) {
    console.error('Error publishing results:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/status', async (req, res) => {
  try {
    const session = await VotingSession.findOne();
    res.send({ status: session ? session.status : 'notStarted' });
  } catch (error) {
    console.error('Error fetching voting session status:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/list', async (req, res) => {
  try {
    const sessions = await VotingSession.find();
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching voting sessions:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
