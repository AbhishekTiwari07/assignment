const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../model/user.js')
require('dotenv').config()

router.post('/signup', async (req, res)=>{
    try{
        const {name, email, password} = req.body
        const user = new User({name, email, password})
        await user.save()
        res.json(user)
    }
    catch(e){
        res.send({
            "message" : e.message
        })
    }
})

router.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user)
            throw new Error('No User Found')

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if(!isMatch)
            throw new Error('Login Failed')
        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.send({
            token
        })
    }
    catch(e){
        res.send({
            'message': e.message
        })
    }
})

router.get('/home', auth, (req, res)=>[
    res.send({
        message : `Welcome ${req.user.name}`
    })
])

module.exports = router