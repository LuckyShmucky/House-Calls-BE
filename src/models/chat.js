require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopolgy: true
    });

const chatSchema = new Schema(
    {
        doctor: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "medicalProvider"
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: "Patient"
        },
        content: { 
            type: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }],
        required: true 
        },
        
        

    },
    {toJSON: { virtuals: true }}
);

// const chat = mongoose.model("medicalProvider", chatSchema);
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat;

