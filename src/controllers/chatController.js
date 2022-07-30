const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const Message = require('../models/message')
const Patient = require('../models/patient')
const medicalProvider = require('../models/medicalDoctor')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to chat route"
    })
})

//creating Chat
router.post('/', async (req, res) => {
    if (req.body === false) return;
    
    try{
        const newChat = await Chat.create(req.body)
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


router.post('/newMessage', async (req, res) => {
    if (req.body === false) return;
    
    try{
        const newMessage = await Message.create(req.body)
        res.status(200).json({
            message: `${newMessage} created`
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