import { Modifier } from "./Modifier";

export interface EnhancerPotion {
  _id: string,
  name: string,
  description: string,
  image: string,
  type: string,
  value: number,
  duration: number,
  modifiers: {
    intelligence: Number,
    dexterity: Number,
    constitution: Number,
    insanity: Number,
    charisma: Number,
    strength: Number
  },
  min_lvl: number
}