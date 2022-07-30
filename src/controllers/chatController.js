const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "medical doctor"
    })
})

//creating Chat
router.post('/', async (req, res) => {
    if (req.body === false) return;
    let { ...rest } = req.body
    try{
        const newChat = await Chat.create({
            ...rest
        })
        res.status(200).json({
            message: `${newChat} created`
        })
    } 
    catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
    
})
//getting the post by id
router.get('/:id', async (req, res) => {
    if (req.params.id === false) return;
    try {
        const chat = await Chat.findById(req.params.id)
        res.status(200).json({
            message: `${chat} posted`
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

//delete
router.get('/:id', (req, res) => {
    db.findByIdAndRemove({ _id: req.params.id }, function (err, chat) {
    if (err) res.json(err);
    else res.json(`${chat} deleted` );
    });
    });

    module.exports = router