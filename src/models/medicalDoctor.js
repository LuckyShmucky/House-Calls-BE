require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
<<<<<<< Updated upstream
mongoose.connect(process.env.MONGO_STRING,
  {
      useNewUrlParser: true,
      useUnifiedTopolgy: true
  });
=======
mongoose.connect(
  "mongodb+srv://Christian:Fc5E1NDTDndOVR6P@myfirstcluster.zfxo9.mongodb.net/House-Calls"
);
>>>>>>> Stashed changes

const medicalDoctorSchema = new Schema(
  {
    role: { type: String, default: "Doctor", placeholder: "Doctor" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    NPIMedicalLicense: {
      type: Number,
      min: 1000000000,
      max: 9999999999,
      required: true,
    },
    pass: { type: String, required: true },
  },
  { toJSON: { virtuals: true } }
);

const medicalProvider = mongoose.model("medicalProvider", medicalDoctorSchema);

module.exports = medicalProvider;
