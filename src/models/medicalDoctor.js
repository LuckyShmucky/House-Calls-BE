require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_STRING,
  {
      useNewUrlParser: true,
      useUnifiedTopolgy: true
  });

const medicalDoctorSchema = new Schema(
  {
    role: { type: String, default: "Doctor", placeholder: "Doctor" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    NPIMedicalLicense: {
      type: Number,
      min: 1000000000,
      max: 9999999999,
      required: true,
      unique: true
    },
    pass: { type: String, required: true },
    chats: { 
      type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
  }],
  required: true 
  },
  },
  { toJSON: { virtuals: true } }
);

const medicalProvider = mongoose.model("medicalProvider", medicalDoctorSchema);

module.exports = medicalProvider;
