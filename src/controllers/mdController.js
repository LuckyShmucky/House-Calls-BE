const express = require('express')
const router = express.Router()
const Provider = require('../models/medicalDoctor')
const db = require('../models/medicalDoctor')



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

//updating the provider
router.put('/:id', async (req, res) => {
    if (req.params.id === false) return;
    try {
        const updateProvider = await Patient.updateOne({ _id: req.params.id }, {$set: req.body}, { upsert: true })
        
        res.status(200).json({
            message: `${updateProvider} was updated`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

//password encryption
// post method that creates a new patient and hashes the password during creation
router.post('/', async (req, res) => {
    // console.log(req.body)
    if (req.body === false) return;
    // here we are using object destructuring to be able to more easily target the password in order to hash in the try/catch statement
    let { pass, ...rest} = req.body
    try{
        const newProvider = await Patient.create({
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        })
        // console.log(newPatient)
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

//delete
router.get('/:id', (req, res) => {
    db.findByIdAndRemove({ _id: req.params.id }, function (err, provider) {
    if (err) res.json(err);
    else res.json(`${provider} deleted` );
    });
    });
    
module.exports = router
