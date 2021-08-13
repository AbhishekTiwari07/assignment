const express = require('express')
const user = require('./routes/user')
require('./db/db')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(user)

app.listen(port, (err)=>{
    if(err)
        console.log(err)
    console.log(`Server up at port:${port}`)
})