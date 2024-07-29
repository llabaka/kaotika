import { Modifier } from "./Modifier"

export interface Weapon {
  _id: string,
  name: string,
  description: string,
  type: string,
  image: string,
  damage: string,
  base_percentage: number,
  modifiers: Modifier,
  min_lvl: number
}