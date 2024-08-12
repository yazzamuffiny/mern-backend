const express = require('express');

const router = express.Router();


//controller functions 
const { signupUser, loginUser } =require('../controllers/userController')

//login route
router.post('/login', () => {})
//signup route
router.post('/signup', () => {})






module.exports = router;