const auth = require('./auth');
const candidates = require('./candidates');
const users = require('./users');
const votes = require('./votes');
const votingSession = require('./votingSession'); // Add this line

module.exports = { auth, candidates, users, votes, votingSession }; // Add 'votingSession' here
