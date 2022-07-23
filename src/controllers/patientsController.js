const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: "route for patients"
    })
})

router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body === false) return;

    try{
        // const newPatient = await 
        res.status(200).json({
            message: `${req.body}`
        })
    } catch(err){
        res.status(400).json({
            message: `${err}`
        })
    }
})

module.exports = router