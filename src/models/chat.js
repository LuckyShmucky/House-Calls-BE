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
        // content: [{ 
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "Message"
        // }],
        // add when message model is done
        

    },
    {toJSON: { virtuals: true }}
);

// const chat = mongoose.model("medicalProvider", chatSchema);
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat;

