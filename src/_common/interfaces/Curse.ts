import { Modifier } from "./Modifier";

export interface Curse {
    _id: string;
    name: string;
    description: string;
    type: string;
    modifiers: Modifier[];
}
