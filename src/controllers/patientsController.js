const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const bcrypt = require('bcrypt')
// const { findById } = require('../models/patient')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "route for patients"
    })
})

// post method that creates a new patient and hashes the password during creation
router.post('/', async (req, res) => {
    // console.log(req.body)
    if (req.body === false) return;
    // here we are using object destructuring to be able to more easily target the password in order to hash in the try/catch statement
    let { pass, ...rest} = req.body
    try{
        const newPatient = await Patient.create({
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        })
        // console.log(newPatient)
        res.status(200).json({
            message: `${newPatient} was created`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

// finds a patient by their id and deletes it (I chose to do find and delete on separate lines due to hearing somewhere that using the methods
// that find and perform a crud method simultaneously have issues with security)
router.delete('/:id', async (req, res) => {
    if (req.params.id === false) return;
    try {
        const deletedPatient = await Patient.findById(req.params.id)
        deletedPatient.delete()
        res.status(200).json({
            message: `${deletedPatient} deleted`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})


// gets a patient by their email
router.get('/:email', async (req, res) => {
    if (req.params.email === false) return;
    try {
        const foundPatient = await Patient.findOne({ email: req.params.email })
        if (!foundPatient || !await bcrypt.compare(req.body.password))
        res.status(200).json({
            message: `${foundPatient} found`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

// finds a patient by id and updates it by setting it to the request body
router.put('/:id', async (req, res) => {
    if (req.params.id === false) return;
    try {
        const updatedPatient = await Patient.updateOne({ _id: req.params.id }, {$set: req.body}, { upsert: true })
        
        res.status(200).json({
            message: `${updatedPatient} was updated`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

module.exports = router 