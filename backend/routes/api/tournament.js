const express = require('express');
const router = express.Router();

router.get('/', (req,res) => res.send('tournament route '));

module.exports = router