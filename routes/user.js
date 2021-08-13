const router = require('express').Router()
const User = require('../model/user.js')

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

module.exports = router