const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const bcrypt = require('bcrypt')

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

module.exports = router 