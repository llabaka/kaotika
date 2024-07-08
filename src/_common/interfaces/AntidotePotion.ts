import { Curse } from "./Curse";

export interface AntidotePotion {
    _id: string, 
    name: string,
    description: string,
    image: string,
    type: string,
    recovery_effect: Curse,
    min_level: number
}