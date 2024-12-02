import mongoose, {Document, Schema} from "mongoose";
import { Modifier } from "@/_common/interfaces/Modifier";

export interface HelmetProduct extends Document{
    _id: String,
    name: string,
    description: string,
    type: string,
    value: number,
    defense: number,
    image: string,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}

const helmetSchema: Schema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    type: String,
    value: Number,
    defense: Number,
    image: String,
    modifiers: Object,
    min_lvl: Number,
    isUnique: Boolean,
    isActive: Boolean
})

const Helmet = mongoose.model<HelmetProduct>("Helmet", helmetSchema);

export default Helmet;