const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')


router.get('/', (req, res) => {
    res.status(200).json({
        message: "route for patients"
    })
})

router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body === false) return;
    try{
        const newPatient = await Patient.create(req.body)
        res.status(200).json({
            message: `${newPatient} was created`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

module.exports = router