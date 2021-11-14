const express = require('express');
const router = express.Router();
const {check, validationRequest, validationResult }  = require('express-validator');
const refereeSchema = require('../../models/referee');
const login = require('../../middleware/login');
var nodemailer = require('nodemailer');

router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('address', 'please provide address').not().isEmpty(),
    check('phone','please provide phone number').not().isEmpty(),
    check('refereeGrade', 'please provide the grade').not().isEmpty(),
    check('age', 'please provide the age').not().isEmpty(),
    check('comfortLevels','please provide the comfort levels').not().isEmpty()
], 
async (req,res) => {
    console.log(req.body);
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()});
    }
    const { name,email,address,phone,refereeGrade,age,comfortLevels } = req.body;
    try{
               
        referee = new refereeSchema({
            name,
            email,
            address,
            phone,
            refereeGrade,
            age,
            comfortLevels
        });

        await referee.save();
        return res.status(200).json({status: "successfully added referee"})

    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.get('/', login,
check('email', 'please include a valid email').isEmail(),
async (req,res) => {
    try {
        const referees = await refereeSchema.find({refereeID: {$ne: null}}).sort({ date: -1 });
        res.json(referees);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}
);

router.get('/getPersonalDetails',
async (req,res) => {
    try {
        const errors  = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json( {errors: errors.array()});
        }
        const email = req.query.email;
        const referee = await refereeSchema.find({email}).exec();
        res.json(referee);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}
);

router.get('/pending', login,
async (req,res) => {
    try {
        const pendingReferees = await refereeSchema.find({refereeID: null}).sort({ date: -1 });
        res.json(pendingReferees);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}
);

router.post('/approve',
[
    check('email', 'please include a valid email').isEmail()
],
 login,
async(req,res) => {
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()});
    }
    try{
        const email = req.body.email;
        const referees = await refereeSchema.find({email, refereeID: { $eq: null }}).exec();
        const id= referees.refereeID
        if(!referees){
            res.status(400).json({errors: "requested referee is already approved"});
        }
        else{
            console.log("reached");
            const randomNumber = Math.floor(Math.random() * 100);
            const idForReferee = "ref00" + randomNumber.toString();
            console.log(`${idForReferee}`);
            let result = await refereeSchema.updateOne({email},{$set: { refereeID: idForReferee }});            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'team26soccer@gmail.com',
                  pass: 'Temp@123'
                }
              });
              
              var mailOptions = {
                from: 'team26soccer@gmail.com',
                to: email,
                subject: 'Congrats you application for referee is now approved',
                text: 'Congratualtions!!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return res.status(400).json({"msg" : "Failure at sending mail"}) 
                } else {
                  console.log('Email sent: ' + info.response);
                  return res.status(200).json({"msg" : "Successfully Approved"}) 
                }
              });
              
       }
    }
    catch(err){
        return res.status(500).send('Server Error');
    }
}
)


module.exports = router;