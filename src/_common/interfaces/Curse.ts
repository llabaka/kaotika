import { Modifier } from "./Modifier";

export interface Curse {
    _id: string;
    name: string;
    description: string;
    type: string;
    modifiers: {
        hit_points: number,
        intelligence: Number,
        dexterity: Number,
        constitution: Number,
        insanity: Number,
        charisma: Number,
        strength: Number
    }
}
