import { Modifier } from "./Modifier"

export interface Armor {
    _id: string,
    name: string,
    description: string,
    type: string,
    image: string,
    modifiers: Modifier[],
    min_level: number
  }