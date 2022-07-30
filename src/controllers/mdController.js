const express = require('express')
const router = express.Router()
const Provider = require('../models/medicalDoctor')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.status(200).json({
        message: "medical doctor"
    })
})

// post method that creates a new Medical Provider and hashes the password during creation
router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body === false) return;
    let { pass, ...rest} = req.body
    try{
        const newProvider = await Provider.create({
            ...rest,
            pass : await bcrypt.hash(pass, 10)
        })
        res.status(200).json({
            message: `${newProvider} was created`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

//updating the provider by finding it by id
router.put('/:email', async (req, res) => {
    if (req.params.email === false) return;
    let {pass, ...rest} = req.body
    try {
        await Provider.updateOne({ email: req.params.email }, {$set: {
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

//delete
router.get('/:id', (req, res) => {
    Provider.findByIdAndRemove({ _id: req.params.id }, function (err, provider) {
    if (err) res.json(err);
    else res.json(`${provider} deleted` );
    });
    });

module.exports = router
