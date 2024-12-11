import mongoose, { Document, Model, Schema } from "mongoose";

// Define Document type/interface for the Model
export type Player = Document & {
    name: string;
    type: string;
    other: string[];
}

// Define mongoose Schema
const playerSampleSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    other: { type: [String], required: true }
});

// Create Model
const PlayerSampleModel: Model<Player> = mongoose.model<Player>("Sample", playerSampleSchema);

export { PlayerSampleModel };
