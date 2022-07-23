const express = require('express')
const router = express.Router()

router.get('/md', (req, res) => {
    res.status(200).json({
        message: "medical doctor"
    })
})


module.exports = router
