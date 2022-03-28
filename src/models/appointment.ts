import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
  id: { type: String },
  petId: { type: String, required: true },
  petName: { type: String, required: true },
  owner: { type: String, required: true },
  date: { type: Date, required: true },
  veterinarianName: { type: String, required: true, minlength: 2 },
  diagnosis: { type: String, required: true, minlength: 2 },
  medications: { type: String, required: true, length: 2 },
  bloodTest: { type: String, required: true },
  xRay: { type: String, required: true }
});

export default model("Appointment", appointmentSchema);
