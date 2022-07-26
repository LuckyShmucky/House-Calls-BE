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

router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body === false) return;
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

router.delete('/:id', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const foundPatient = await Patient.findById(req.params.id)
        res.status(200).json({
            message: `${foundPatient} found`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

module.exports = router 