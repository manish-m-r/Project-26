const express = require('express');
const router = express.Router();
const refereeSchema = require('../../models/referee');


router.get('/', (req,res) => res.send('coach route '));

module.exports = router