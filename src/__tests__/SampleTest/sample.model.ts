import mongoose, { Document, Model, Schema } from "mongoose";

// Definir la interfaz del documento para el modelo
export type ISample = Document & {
    name: string;
    type: string;
    other: string[];
}

// Definir el esquema de Mongoose
const sampleSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    other: { type: [String], required: true }
});

// Crear el modelo
const SampleModel: Model<ISample> = mongoose.model<ISample>("Sample", sampleSchema);

export { SampleModel };
