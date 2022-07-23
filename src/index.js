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
app.use('/patients', require('./controllers/patientsController.js'))
app.use'/md', require('./controllers/mdController.js')
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



/// For later use when we want the server to be a little more secure ///
// cors allows us to specifiy what urls can make a request to our server, by doing so below: //

// here we are declaring a variable and setting a property called origin to the url of a website we want to allow to make requests to the backend
// and another property as a status message
// let corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
   
// in the get route method we pass in the cors function as a parameter (which has the Cors option parameter declared early as a parameter)
// basically this tells the get method that only this website has access to this route
//   app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
//   })
   