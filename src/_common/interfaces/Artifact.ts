import { Modifier } from "./Modifier"

export interface Artifact {
  _id: string,
  name: string, 
  description: string,
  image: string,
  modifiers_charisma: Modifier[],
  modifiers: Modifier[],
  min_level: number
}