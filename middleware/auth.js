const jwt = require('jsonwebtoken')
const User = require('../model/user')
require('dotenv').config()


const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({ email : decoded.email})
        if(!user){
            throw new Error("Authentication Error")
        }
        req.user = user
    }
    catch(e){
        return res.send({error : e.message})
    }
    next()
}

module.exports = auth