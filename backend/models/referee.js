const mongoose = require('mongoose');

const refereeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
      type: String,
      required: true
  },
  refereeGrade: {
      type: Number,
      required: true
  },
  age: {
      type: Number,
      required: true
  },
  comfortLevels: {
      type: [{type: String}]
  },
  date: {
    type: Date,
    default: Date.now
  },
  refereeID: {
      type: String,
      default: null
  }
});

module.exports = mongoose.model('referee', refereeSchema);