const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
require('dotenv').config()

const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid Email")
        }
    },
    password :{
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(this.isModified('password'))
        this.password = await bcrypt.hash(this.password,8)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User