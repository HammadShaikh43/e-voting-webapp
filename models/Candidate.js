const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  votes: { type: Number, default: 0 },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;
