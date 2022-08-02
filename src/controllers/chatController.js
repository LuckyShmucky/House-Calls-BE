const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const Message = require('../models/message')
const Patient = require('../models/patient')
const medicalProvider = require('../models/medicalDoctor')
const { response } = require('express')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to chat route"
    })
})

//creating Chat and adding that new chat to the "chats" field on both patient and doctors users involved in the chat
// all that needs to be in the request body is the patient and doctor id
router.post('/', async (req, res) => {
    if (req.body === false) return;
    // console.log(req.body)
    
    try{
        const newChat = await Chat.create(req.body)
        // console.log(newChat.patient)
        newChat.save(function(err, success){
            if (err){
                console.log(err, 'chat controller line 25 on root post route')
            } else {
                res.status(200).json(success.id)
            }
        })
       
       Patient.updateOne({_id: newChat.patient}, {$push: {chats: newChat.id}},
            function(error, success){
                if (error){
                    console.log(error, 'chatController.js line 26')
                } else{
                    console.log('a new chat has been created')
                }
            })
        
        medicalProvider.updateOne({_id: newChat.doctor}, {$push: {chats: newChat.id}},
            function(error, success){
                if (error){
                    console.log(error, 'chatController.js line 34')
                }
            })
        // res.status(200).json({
        //     message: `${newChat} created`
        // })
    } 
    catch(err){
        res.status(400).json({
            message: `${err} occured in chat controller line 52 `
        })
    }
    
})


// finding a chat by id
router.get('/:chatId', async (req, res) => {
    if(req.params.chatId === false) return;
    try{
          Chat.findOne({
            _id: req.params.chatId
        }).
        populate('content').
        exec(async function (err, data){
            if (err){
                console.log(err, '')
            } else {
            let messages = []
            data.content.map(i => messages.push({text: i.text, role: i.onModel}))  
            res.json(messages)
            }

        })
        
        // res.status(200).json(foundChat)
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
    //    console.log(newMessage.id)
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

router.get('/patientChats/:id', (req, res) => {
    
        Chat.find({patient: req.params.id}, function(error, data){
            if (error){
               console.log(error, 'finding chats in chat controller line 112')
               res.json(error, 'finding chats in chat controller line 112')

            } else {
                try{

                    let response = []
                    data.map(i => response.push(i._id) )
                    console.log(response)
                    res.status(200).json({
                        message: 'array of chat ids',
                        data: response
                    })
                } catch(err){
                    console.log(err, 'chatController line 124')
                }
            }
        })
    
})

router.get('/doctorChats/:id', (req, res) => {
    
    Chat.find({doctor: req.params.id}, function(error, data){
        if (error){
           console.log(error, 'finding chats in chat controller line 112')
           res.json(error, 'finding chats in chat controller line 112')

        } else {
            try{

                let response = []
                data.map(i => response.push(i._id) )
                console.log(response)
                res.status(200).json({
                    message: 'array of chat ids',
                    data: response
                })
            } catch(err){
                console.log(err, 'chatController line 152')
            }
        }
    })

})






    module.exports = router