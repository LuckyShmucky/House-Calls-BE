const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.status(200).json({
        message: "authenticating..."
    })
})

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

module.exports = router