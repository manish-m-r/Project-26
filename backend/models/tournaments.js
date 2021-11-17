const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  team1: {
    type: String,
    required: true
  },
  team2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: () => Date.now() + 10*24*60*60*1000
  }
});

module.exports = mongoose.model('tournaments', tournamentSchema);