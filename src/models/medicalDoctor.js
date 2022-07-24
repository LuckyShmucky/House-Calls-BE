const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_STRING);

const medicalDoctorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    hasMedicalLicense: { type: Boolean, required: true },
  },
  { toJSON: { virtuals: true } }
);

const medicalProvider = mongoose.model("medicalProvider", medicalDoctorSchema);

module.exports = medicalProvider;
