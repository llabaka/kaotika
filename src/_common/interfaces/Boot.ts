import { Modifier } from "./Modifier"

export interface Boot {
  _id: string,
  name: string,
  description: string,
  type: string,
  image: string,
  modifiers: Modifier,
  min_level: number
}