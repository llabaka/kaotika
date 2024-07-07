import { Attribute } from "./Attribute";

export interface Profile {
  attributes: Attribute[];
  description: string;
  name: string;
  image: string;
  _id: string;
}