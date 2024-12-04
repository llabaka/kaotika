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
}