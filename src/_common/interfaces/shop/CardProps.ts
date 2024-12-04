import { Armor } from "../Armor";
import { Artifact } from "../Artifact";
import { Boot } from "../Boot";
import { Helmet } from "../Helmet";
import { Modifier } from "../Modifier";
import { Ring } from "../Ring";
import { Shield } from "../Shield";
import { Weapon } from "../Weapon";

export type CardProps = Armor | Weapon | Helmet | Artifact | Boot | Ring | Shield | Ingredient

interface Ingredient {
    name: string;
    description: string;
    value: number;
    effects: string[];
    image: string;
    type: string;
    modifiers: Modifier | null;
    min_lvl: null
    quantity?: number; // Añadimos quantity como opcional
}

export interface CartItem {
    _id?: string,
    name?: string,
    description?: string,
    type?: string,
    image?: string,
    effects?: string[];
    defense?: number,
    value: number,
    isUnique?: boolean,
    isActive?: boolean,
    modifiers?: Modifier,
    min_lvl?: number,
    quantity?: number
    die_faces: 2,
    die_modifier: 1,
    die_num: 10,
    base_percentage: 12
}