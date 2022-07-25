const express = require('express')
const router = express.Router()
const Provider = require('../models/medicalDoctor')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "medical doctor"
    })
})

router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body === false) return;
    try{
        const newProvider = await Provider.create(req.body)
        res.status(200).json({
            message: `${newProvider} was created`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})


module.exports = router
