require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
// mongoose.connect()



app.options('*', cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the home route for House Calls'
    })
})

app.get('*', (req, res) =>{
    res.status(404).json({
        message: "This url doesn't exist"
    })
})

app.listen(process.env.PORT, () =>{
    console.log('server is running')
})