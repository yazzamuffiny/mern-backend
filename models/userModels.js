const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static for sign up method
userSchema.statics.signup = async function (email, password) {
    //check if there is a value for email & password
    if(!email || !password) {
        throw Error('All fields must be filled in')
    }

    //check email against validator
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    // check password against generator
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    //check if email is already in use
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    //salt adds extra characters to the password
    const salt = await bcrypt.genSalt(10)
    //hash turn the password into a random ass string of characters
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}


//static for login
userSchema.statics.login = async function (email, password) {
    //check if fields have been filed
    if (!email || !password) {
        throw Error('All fields must be filled in')
    }

    //try and find user in db with the email
    const user = await this.findOne({email})
    if(!user) {
        throw Error('Incorrect email')
    }

    //compare saved hash password to entered password converted to hash
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)