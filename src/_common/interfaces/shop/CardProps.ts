import { Modifier } from "../Modifier";

export type CardProps = ArmorShop | WeaponShop | Ingredient | RingShop | HelmetShop | ShieldShop | ArtifactShop | BootShop;

interface Ingredient {
    _id: string;
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
    type?: "ingredient" | "armor" | "weapon" | "helmet" | "ring" | "shield" | "artifact" | "boot" 
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

interface HelmetShop {
    _id: string,
    name: string,
    description: string,
    type: "helmet",
    value: number,
    defense: number,
    image: string,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}

interface RingShop {
    _id: string,
    name: string,
    description: string,
    type: "ring",
    image: string,
    value: number,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}

interface ShieldShop {
    _id: string,
    name: string,
    description: string,
    type: "shield",
    image: string,
    value: number,
    defense: number,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}

interface ArtifactShop {
    _id: string,
    name: string, 
    description: string,
    type: "artifact",
    image: string,
    value: number,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}

interface BootShop {
    _id: string,
    name: string,
    description: string,
    type: "boot",
    image: string,
    value: number,
    defense: number,
    modifiers: Modifier,
    min_lvl: number,
    isUnique: boolean,
    isActive: boolean
}