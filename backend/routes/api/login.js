const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../../middleware/login');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const admin = require('../../models/admin');

router.get('/', login, async (req, res) => {
    try {
      const adminList = await admin.findById(req.admin.id).select('-password');
      res.json(adminList);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post(
    '/',
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
          admin: {
            id: admin.id
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




//router.get('/', (req,res) => res.send('login route '));

module.exports = router