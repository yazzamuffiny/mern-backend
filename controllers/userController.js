//import user model
const User = require('../models/userModels')

const jwt = require('jsonwebtoken')

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        //call on the custom login static method form user model
        const user = await User.login(email, password)
        //create the token fr
        const token = createToken(user._id)
        //return the email and logged in token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        //call the custom signup static method defined in the User Model
        const user = await User.signup(email, password)
        //create a token
        const token = createToken(user._id)
        //return email & new user
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

//create user token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'} )
}



module.exports = {
    signupUser,
    loginUser
}