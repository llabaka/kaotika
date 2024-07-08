import { Modifier } from "./Modifier"

export interface HealingPotion {
    _id: string,
    name: string,
    description: string,
    image: string,
    type: string,
    modifiers: Modifier[],
    min_level: number
}