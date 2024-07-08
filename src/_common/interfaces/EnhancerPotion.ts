import { Modifier } from "./Modifier";

export interface EnhancerPotion {
  _id: string,
  name: string,
  description: string,
  image: string,
  type: string,
  duration: number,
  modifiers: Modifier[],
  min_level: number
}