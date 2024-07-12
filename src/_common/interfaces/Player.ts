import { Attribute } from "./Attribute";
import { AntidotePotion } from "./AntidotePotion";
import { HealingPotion } from "./HealingPotion";
import { EnhancerPotion } from "./EnhancerPotion";
import { Artifact } from "./Artifact";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";
import { Profile } from "./Profile";

export interface Player {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  experience: number;
  level: number;
  gold: number;
  is_active: boolean;
  profile: Profile;
  equipment:{
    armor: Armor,
    weapon: Weapon,
    artifact: Artifact,
    healing_potion: HealingPotion,
    antidote_potion: AntidotePotion,
    enhancer_potion: EnhancerPotion,
  } 
}