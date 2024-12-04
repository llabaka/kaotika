import { Armor } from "../Armor";
import { Artifact } from "../Artifact";
import { Boot } from "../Boot";
import { Helmet } from "../Helmet";
import { Modifier } from "../Modifier";
import { Ring } from "../Ring";
import { Shield } from "../Shield";
import { Weapon } from "../Weapon";

export type CardProps = ArmorShop | WeaponShop | Ingredient

interface Ingredient {
    name: string;
    description: string;
    value: number;
    effects: string[];
    image: string;
    type: "ingredient";
    modifiers: Modifier | null;
    min_lvl: null
    quantity?: number; // Añadimos quantity como opcional
}

export interface Product {
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
    die_faces?: number,
    die_modifier?: number,
    die_num?: number,
    base_percentage?: number
}

export interface ArmorShop {
    _id: string,
    name: string,
    description: string,
    type: "armor",
    image: string,
    defense: number,
    value: number,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean,
}

interface WeaponShop {
    _id: string,
    name: string,
    description: string,
    type: "weapon",
    image: string,
    die_faces: number,
    die_modifier: number,
    die_num: number,
    value: number,
    base_percentage: number,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}

