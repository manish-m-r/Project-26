const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    applicationAgeGroup: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    leagueGender: {
        type: String,
        required: true
    },
    leagueAge: {
        type: String,
        required: true
    },
    dobOfOldest: {
        type: Date,
        required: true,
        trim: true
    },
    coachName: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    association: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    cotactIs: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    teamIdNumber: {
        type: String
    },
    expiryOfPayment: {
        type: Date
    },
    status: {
        type: Boolean
    }
});

module.exports = team = mongoose.model('team', teamSchema);