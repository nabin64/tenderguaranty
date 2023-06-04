const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require('path')


const User = require('../controller/user');

router.post('/register', User.registerUser)
router.post('/login',User.loginUser)



module.exports = router;