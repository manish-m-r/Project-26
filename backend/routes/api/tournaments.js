const express = require('express');
const router = express.Router();
const {check, validationRequest, validationResult }  = require('express-validator');
const teamSchema = require('../../models/team');
const tournamentSchema = require('../../models/tournaments');
const login = require('../../middleware/login');
var nodemailer = require('nodemailer');

router.post('/',[
    check('team1', 'Provide the team1 email address').not().isEmpty(),
    check('team2', 'Provide the team2 email address').not().isEmpty()
], login, 
async (req,res) => {
    console.log(req.body);
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()});
    }
    const { team1,team2 } = req.body;
    const matches = await tournamentSchema.find({$and:[{team1},{team2},{date : { "$gt" : new Date() }}]})
    if(matches.length>Number(0)){
        return res.status(400).json({"msg": "same match is already scheduled"});
    }
    try{
        match = new tournamentSchema({
            team1,
            team2
        });

        await match.save();
        return res.status(200).json({status: "successfully added match to the tournament list"})

    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.get('/getPersonalDetails',
async (req,res) => {
    try {
        const email = req.query.date;
        const referee = await refereeSchema.find({email}).exec();
        res.json(referee);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}
);

module.exports = router;