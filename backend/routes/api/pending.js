const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../../middleware/login');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const refereeSchema = require('../../models/referee');



module.exports = router