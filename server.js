const express = require('express')
require('./db/db')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3001

app.listen(port, (err)=>{
    if(err)
        console.log(err)
    console.log(`Server up at port:${port}`)
})