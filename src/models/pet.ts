import { Schema, model } from "mongoose";

const petSchema = new Schema({
  id: { type: String },
  dni: { type: String, required: true, length: 8 },
  name: { type: String, required: true, minlength: 2 },
  breed: { type: String, required: true, minlength: 2 },
  gender: { type: String, required: true, length: 1 },
  birthday: { type: Date, required: true },
  file: { type: String, required: true }
});

export default model("Pet", petSchema);
