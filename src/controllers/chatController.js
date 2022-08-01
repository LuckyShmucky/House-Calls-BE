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


// finding a chat by id
router.get('/:chatId', async (req, res) => {
    if(req.params.chatId === false) return;
    try{
        const foundChat = await Chat.find({
            _id: req.params.chatId
        })
        res.status(200).json(foundChat)
    } catch(err){
    res.status(400).json({
            message: `${err} occured`
        })
    }
})

// adding a new message to a chat
router.post('/messages/:chatId', async (req, res) => {
    try{
              
       const newMessage = await Message.create(req.body)
       console.log(newMessage.id)
       const foundChat = Chat.findOneAndUpdate({_id: req.params.chatId}, {$push: {content: newMessage.id}},
        function(error, success){
            if (error){
                console.log(error)
            } else{
                res.status(200).json(success)
            }
        })
      
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

    // try{
    //     const newMessage = await Message.create(req.body)
    //     res.status(200).json({
    //         message: `${newMessage} created`
    //     })
    // } 
    // catch(err){
    //     res.status(400).json({
    //         message: `${err} occured`
    //     })
    // }
    
// })







    module.exports = router