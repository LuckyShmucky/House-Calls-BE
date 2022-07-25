const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_STRING);

const medicalDoctorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },

    NPIMedicalLicense: { type: Number, min: 1000000000, max: 9999999999},

  },
  { toJSON: { virtuals: true } }
);

const medicalProvider = mongoose.model("medicalProvider", medicalDoctorSchema);

module.exports = medicalProvider;
