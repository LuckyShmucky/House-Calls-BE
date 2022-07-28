const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const Doctor = require('../models/medicalDoctor')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.status(200).json({
        message: "authenticating...."
    })
})
// while we are not actually creating anything in this route, we need the Front end to send 
// a request body containing the password they are trying to use.
// Therefore, a post method is more desirable than a get method
router.post('/:email', async (req, res) => {
    // if (req.params.email === false) return;
    try {
        // this route is able to find a document in the DB by the email
        const foundPatient = await Patient.findOne({ email: req.params.email })
        // console.log(foundPatient)
        // if the patient does not exist or the hashed password being sent in the post request does not match the one in the DB deny access
        if (!foundPatient || !await bcrypt.compare(req.body.pass, foundPatient.pass)){
            res.status(404).json({
                message: 'wrong email or password'
            })
        } else {
            // if the two conditions from before are met then the server responds with the user information
            
                res.status(200).json(foundPatient)
             
            }
        } catch(err){
        res.status(404).json({
            message: `${err} occured`
        })
    }
})

router.post('/employee/:medicalDoctorEmail', async (req, res) => {
    try{
        const foundDoctor = await Doctor.findOne({ email: req.params.medicalDoctorEmail})
        if (!foundDoctor || !await bcrypt.compare(req.body.pass, foundDoctor.pass)){
            res.status(200).json(foundDoctor)
            res.status(404).json({
                message: 'wrong email or password'
            })
        } else {
            res.status(200).json(foundDoctor)
        }
    } catch(err){
        res.status(404).json({
            message: `${err} occured`
        })
    }
})

module.exports = router