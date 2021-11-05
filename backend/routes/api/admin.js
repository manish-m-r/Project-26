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
              return res.status(200).json({msg: "admin user added succesfully"});
        }
        catch(err){
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    });

    router.post(
        '/login',
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
      
          const { email, password } = req.body;
      
          try {
            let adminUser = await admin.findOne({ email });
      
            if (!adminUser) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
      
            const isMatch = await bcrypt.compare(password, adminUser.password);
      
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
      
            const payload = {
              user: {
                id: adminUser.id
              }
            };
      
            jwt.sign(
              payload,
              config.get('jwtSecret'),
              { expiresIn: '5 days' },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
        }
      );

    router.get('/',
async (req,res) => {
    try {
        const admins = await admin.find().sort({ date: -1 });
        res.json(admins);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}
);
module.exports = router