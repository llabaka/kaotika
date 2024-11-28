import { Modifier } from "../Modifier";

export interface CardProps {
    minLevel : number;
    image: string;
    modifiers: Modifier;
    name: string;
    description: string;
    icon: string;
    value: number;
}