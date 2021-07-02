const mongoose = require('mongoose')
const validator = require("email-validator")


var userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    }

})

/** Vérification si l'utilisateur n'existe pas déjà */
userSchema.pre('save', async function(next){

    let email = this.email
    let user = await userModel.findOne({email: email})
    if(user) return next(new Error('User already exists'))
    else next()

})

/** Vérification du format de l'email */
/* userSchema.pre('save', async function(next){
    
    let email = this.email
    if(validator.validate(email))
    {
        next()
    }
    else
    {
        next(new Error('Email format error'))
    }   
}) */

var userModel = mongoose.model('user', userSchema)

module.exports = userModel