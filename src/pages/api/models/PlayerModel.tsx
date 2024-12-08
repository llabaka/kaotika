
import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  gold: { type: Number, required: true },
  is_active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  profile: {type: Object},
  attributes: { type: Object, required: true },
  classroom_id: { type: String, default: null },
  equipment: {
    helmet: { type: Object, default: null },
    weapon: { type: Object, required: true },
    armor: { type: Object, required: true },
    shield: { type: Object, default: null },
    artifact: { type: Object, required: true },
    boot: { type: Object, default: null },
    ring: { type: Object, default: null },
    healing_potion: { type: Object, required: true },
    antidote_potion: { type: Object, required: true },
    enhancer_potion: { type: Object, required: true },
  },
  inventory: {
    helmets: [{ type: Object }],
    weapons: [{ type: Object }],
    armors: [{ type: Object }],
    shields: [{ type: Object }],
    artifacts: [{ type: Object }],
    boots: [{ type: Object }],
    rings: [{ type: Object }],
    healing_potions: [{ type: Object }],
    antidote_potions: [{ type: Object }],
    enhancer_potions: [{ type: Object }],
    ingredients: [{type: Object}],
  },
  tasks: [{ type: Object }],
}, { timestamps: true }); // Agrega campos `createdAt` y `updatedAt` automáticamente

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);