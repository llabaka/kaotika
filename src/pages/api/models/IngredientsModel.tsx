import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
  effects: {type: Array, require: true},
  image: { type: String, required: true },
  type: { type: String, required: true },
}, { timestamps: true }); // Agrega campos `createdAt` y `updatedAt` automáticamente

export default mongoose.models.Ingredients || mongoose.model("Ingredients", ingredientsSchema);