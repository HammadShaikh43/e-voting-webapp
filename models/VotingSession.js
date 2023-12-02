const mongoose = require('mongoose');

const votingSessionSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ['notStarted', 'ongoing', 'ended'],
    default: 'notStarted',
  },
  resultsPublished: { type: Boolean, default: false },
});

const VotingSession = mongoose.model('VotingSession', votingSessionSchema);
module.exports = VotingSession;
