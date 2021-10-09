const express = require('express');
const router = express.Router();
const {check, validationRequest, validationResult }  = require('express-validator');
const teamSchema = require('../../models/team');

router.post('/',[
    check('teamName', 'team name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('applicationAgeGroup', 'please provide application age group').not().isEmpty(),
    check('leagueGender','please provide leagure gender').not().isEmpty(),
    check('leagueAge', 'please provide league age').not().isEmpty(),
    check('dobOfOldest', 'please provide the DOB of oldest member').not().isEmpty(),
    check('coachName','please provide the coach name').not().isEmpty(),
    check('clubName', 'please provide the club name').not().isEmpty(),
    check('association', 'please provide the association').not().isEmpty(),
    check('league','please provide the league name').not().isEmpty(),
    check('firstName','please provide the first name').not().isEmpty(),
    check('secondName','please provide the second name').not().isEmpty(),
    check('cotactIs','please provide the contact person').not().isEmpty(),
    check('address','please provide the address for the contact').not().isEmpty()

], 
async (req,res) => {
    console.log(req.body);
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()});
    }
    const { teamName,email,applicationAgeGroup,leagueGender,leagueAge,dobOfOldest,coachName,clubName,association,league,firstName,secondName,cotactIs,address } = req.body;
    try{
        let teamname = await teamSchema.findOne({teamname : `${req.body.teamname}`});
        if(teamname){
            res.status(400).json({errors: [{msg: "please use another team name"}]});
        }
        
        team = new teamSchema({
            teamName,
            email,
            applicationAgeGroup,
            leagueGender,
            leagueAge,
            dobOfOldest,
            coachName,
            clubName,
            association,
            league,
            firstName,
            secondName,
            cotactIs,
            address
        });

        await team.save();

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

    res.send('team route');
});

router.get('/',
async (req,res) => {
    try {
        const teams = await teamSchema.find().sort({ date: -1 });
        res.json(teams);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}
);

module.exports = router;