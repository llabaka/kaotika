import { Attribute } from "./Attribute";
import { AntidotePotion } from "./AntidotePotion";
import { HealingPotion } from "./HealingPotion";
import { EnhancerPotion } from "./EnhancerPotion";
import { Artifact } from "./Artifact";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";
import { Profile } from "./Profile";
import { Helmet } from "./Helmet";
import { Shield } from "./Shield";
import { Boot } from "./Boot";
import { Ring } from "./Ring";

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
    helmet: Helmet,
    weapon: Weapon,
    armor: Armor,
    shield: Shield,
    artifact: Artifact,
    boot: Boot,
    ring: Ring,
    healing_potion: HealingPotion,
    antidote_potion: AntidotePotion,
    enhancer_potion: EnhancerPotion,
  },
  inventory: {
    helmets: Helmet[],
    weapons: Weapon[],
    armors: Armor[],
    shields: Shield[],
    artifacts: Artifact[],
    boots: Boot[],
    rings: Ring[],
    healing_potions: HealingPotion[],
    antidote_potions: AntidotePotion[],
    enhancer_potions: EnhancerPotion[],
  }
}