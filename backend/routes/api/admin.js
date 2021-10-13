const express = require('express');
const router = express.Router();
const admin = require('../../models/admin');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const refereeSchema = require('../../models/referee');
const jwtSecret = config.get('jwtSecret');


router.post('/',
    check('name','Name is required').notEmpty(),
    check('email', 'Email Address is required').isEmail(),
    check('password', 'Please enter a password with 6 characters').isLength({min: 6}),
    check('role','ROle is required').notEmpty(),
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try{
            let checkForAdmin = await admin.findOne({ email });
            if (checkForAdmin) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: `${email} already exists` }] });
              }
              adminInst = new admin({
                name,
                email,
                password
              });

              const salt = await bcrypt.genSalt(10);

              adminInst.password = await bcrypt.hash(password, salt);

              await adminInst.save();

        }
        catch(err){
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    });

//     router.get('/',
// async (req,res) => {
//     try {
//         const admins = await admin.find().sort({ date: -1 });
//         res.json(admins);
//       } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server Error');
//       }
// }
// );

// router.get('/refereeApprovals',
// async (req,res) => {
//     try {
//         const pendingReferees = await refereeSchema.find({refereeID: null}).sort({ date: -1 });
//         res.json(pendingReferees);
//       } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server Error');
//       }
// }
// );


module.exports = router