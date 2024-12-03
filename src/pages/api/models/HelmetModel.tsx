import mongoose from "mongoose";

const modifiersSchema = new mongoose.Schema({
  intelligence: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  constitution: { type: Number, required: true },
  insanity: { type: Number, required: true },
  charisma: { type: Number, required: true },
  strength: { type: Number, required: true },
}, { _id: false }); // `false` para no crear un `_id` separado para los subdocumentos

const bootsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
  defense: { type: Number, required: true },
  modifiers: { type: modifiersSchema, required: true },
  min_lvl: { type: Number, required: true },
  isUnique: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
}, { timestamps: true }); // Agrega campos `createdAt` y `updatedAt` automáticamente

export default mongoose.models.Helmet || mongoose.model("Helmet", bootsSchema);