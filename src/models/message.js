require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopolgy: true
    });

const messageSchema = new Schema({
   text: {
    type: String,
    required: true
   },
   author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient" || "medicalProvider"
   }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message