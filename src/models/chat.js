require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://Christian:Fc5E1NDTDndOVR6P@myfirstcluster.zfxo9.mongodb.net/House-Calls');

const chatSchema = new Schema(
    {
        author: { type: String, required: true },
        content: { type: String, required: true},
        interlocutor: {type: String, required: true }

    },
    {toJSON: { virtuals: true }}
);

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
