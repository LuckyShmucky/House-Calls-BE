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
    if (await Patient.findOne({email: req.body.email})){
        res.status(400).json({
            message: 'Email already has account'
        });
        return;
    }
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
router.delete('/:email', async (req, res) => {
    if (req.params.email === false) return;
    
    try {
        const deletedPatient = await Patient.findById(req.params.email)
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

// finds a patient by id and updates it by setting it to the request body
router.put('/:email', async (req, res) => {
    if (req.params.email === false) return;
    let { pass, ...rest} = req.body
    try {
        await Patient.updateOne({ email: req.params.email }, {$set: {
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        }})
        
        res.status(200).json({
            message: `account for ${req.params.email} was updated`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

module.exports = router 