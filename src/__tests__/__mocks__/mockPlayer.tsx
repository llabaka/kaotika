import { Player } from "@/_common/interfaces/Player";

export const mockPlayer: Player = {
    attributes: {
        intelligence: 16,
        dexterity: 59,
        charisma: 28,
        constitution: 23,
        strength: 14,
        insanity: 45
    },
    equipment: {
        weapon: {
            modifiers: {
                intelligence: 5,
                dexterity: 0,
                constitution: 0,
                insanity: 8,
                charisma: -6,
                strength: 0
            },
            _id: "668bca115319ea9afdff0725",
            name: "Twirling Yo-yo",
            description: "A seemingly playful toy with a hidden edge, the Twirling Yo-yo is a versatile weapon in the right hands. ",
            type: "weapon",
            image: "/images/equipment/weapons/weapon_init_3.png",
            value: 10,
            base_percentage: 15,
            min_lvl: 1,
            die_faces: 6,
            die_modifier: 6,
            die_num: 2,
            isUnique: false,
            isActive: false,
        },
        armor: {
            modifiers: {
                strength: -8,
                constitution: 0,
                dexterity: 20,
                intelligence: 25,
                insanity: 0,
                charisma: 20
            },
            _id: "66f3e0f7b32d7add9a087691",
            name: "Guardian's Armament",
            description: "A special armor that protects its bearer with ancient magic.",
            type: "armor",
            image: "/images/equipment/armors/heavy_armor_28.png",
            value: 870,
            defense: 75,
            isUnique: false,
            isActive: true,
            min_lvl: 15
        },
        artifact: {
            modifiers: {
                intelligence: 3,
                dexterity: 2,
                constitution: 8,
                insanity: 1,
                charisma: 6,
                strength: 6
            },
            _id: "66f66ae44a8f1157dab87b69",
            name: "Amulet of Warcry",
            description: "Enhances the power of battle cries.",
            type: "artifact",
            image: "/images/equipment/artifacts/artifact_20.png",
            value: 200,
            min_lvl: 15,
            isActive: true,
            isUnique: false
        },
        antidote_potion: {
            _id: "668bca125319ea9afdff075e",
            name: "Lightbane Elixir",
            description: "A potent concoction brewed from the rare Lumina flowers that only bloom under the full moon. The elixir emits a radiant glow and, when consumed, floods the body with purifying light, banishing the shadows and restoring the natural hue of the skin.",
            type: "antidote",
            image: "/images/equipment/potions/antidote/antidote_1.png",
            value: 10,
            recovery_effect: {
                modifiers: {
                    hit_points: 0,
                    intelligence: 0,
                    dexterity: 0,
                    insanity: 0,
                    charisma: -8,
                    constitution: -12,
                    strength: 0
                },
                _id: "6693fd5846527d0df5f0efe8",
                name: "Frostbane Fever",
                description: "A chilling illness that lowers the body temperature drastically, causing frost to form on the skin and organs to freeze.",
                type: "illness",
                
            },
            min_lvl: 1
        },
        healing_potion: {
            modifiers: {
                hit_points: 40,
                intelligence: -5,
                dexterity: 0,
                constitution: 0,
                insanity: 0,
                charisma: 0,
                strength: 0
            },
            _id: "668bca125319ea9afdff0754",
            name: "Potion of Rejuvenation",
            description: "This revitalizing potion restores energy and vitality to the drinker.",
            type: "healing",
            image: "/images/equipment/potions/healing/healing_2.png",
            value: 10,
            min_lvl: 1
        },
        enhancer_potion: {
            modifiers: {
                intelligence: 0,
                dexterity: 0,
                constitution: 0,
                insanity: 20,
                charisma: 0,
                strength: 0
            },
            _id: "668bca135319ea9afdff076b",
            name: "Potion of Madness",
            description: "A dangerous brew that plunges the drinker into a frenzy, this potion unleashes chaotic energy.",
            type: "enhancer",
            image: "/images/equipment/potions/enhancer/enhancer_2.png",
            value: 10,
            duration: 2,
            min_lvl: 1
        },
        helmet: {
            modifiers: {
                intelligence: 3,
                dexterity: 6,
                constitution: 5,
                insanity: 1,
                charisma: 2,
                strength: 4
            },
            _id: "66f3b3ddc8cdd090db911d96",
            name: "Helm of Eternal Flames",
            description: "Burns with the fire of the eternal.",
            type: "helmet",
            image: "/images/equipment/helmets/helmet_25.png",
            value: 190,
            defense: 27,
            min_lvl: 11,
            isUnique: false,
            isActive: true
        },
        shield: {
            modifiers: {
                intelligence: 0,
                dexterity: 2,
                constitution: 3,
                insanity: 0,
                charisma: 0,
                strength: 5
            },
            _id: "66f27c81c114335cadf45d70",
            name: "Knight's Shield",
            description: "A sturdy shield for knights.",
            type: "shield",
            image: "/images/equipment/shields/shield_initial.png",
            value: 15,
            defense: 10,
            min_lvl: 1,
            isUnique: false,
            isActive: true
        },
        boot: {
            modifiers: {
                intelligence: 0,
                dexterity: 0,
                constitution: 0,
                insanity: 0,
                charisma: 0,
                strength: 0
            },
            _id: "66d99a807518eb499003535f",
            name: "Beggar's path",
            description: "Cheap sinister leather shoes.",
            type: "boot",
            image: "/images/equipment/boots/boot_initial.png",
            value: 5,
            defense: 4,
            min_lvl: 1,
            isUnique: false,
            isActive: false,
        },
        ring: {
            modifiers: {
                intelligence: 2,
                dexterity: 0,
                constitution: 0,
                insanity: 0,
                charisma: 0,
                strength: 2
            },
            _id: "66a6d6c8dfbffe7e6503970f",
            name: "Ring of Eternal Flame",
            description: "A ring that burns with eternal fire.",
            type: "ring",
            image: "/images/equipment/rings/ring_1.png",
            value: 10,
            min_lvl: 1,
            isUnique: false,
            isActive: false,
        }
    },
    inventory: {
        helmets: [],
        weapons: [],
        armors: [],
        shields: [],
        artifacts: [],
        boots: [],
        rings: [],
        antidote_potions: [],
        healing_potions: [],
        enhancer_potions: []
    },
    _id: "66dec0006301a115d494bd0d",
    name: "ASIER ARGUINCHONA LORENZO",
    nickname: "Sr. Polimorfias",
    email: "asier.arguinchona@ikasle.aeg.eus",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIqIoDtJVejSbjrzV889fEhqGR-ILGc99C0-YgY88b11zuiXfk=s96-c",
    classroom_id: "104759198107828454171",
    level: 18,
    experience: 30440,
    is_active: true,
    profile: {
        _id: "6687c31b7a5ce485a0eed478",
        name: "Juggler",
        description: "In the center of the square, where the crowd gathers, the Juggler displays his art. His hands move with hypnotic grace, controlling objects with a precision that seems to defy the laws of physics. He is not only a master of entertainment but also a shrewd strategist. Every move is calculated, every trick a distraction that hides his true intentions. The Juggler is a master of deception, capable of slipping into the shadows and disappearing in the blink of an eye, leaving behind a trail of mystery and awe.",
        image: "/images/profiles/juggler.jpg",
        attributes: [
            {  name: "Intelligence", description: "The intelligence controls the chance of success when using a potion", value: 5 },
            { name: "Dexterity", description: "Manages the chance of success when using a melee weapon and the damage a missile weapon does", value: 30 },
            { name: "Insanity", description: "Indicates the state of mental health of an adventurer. If the insanity is high, there will be more chance to make a fumble of a critical hit, and the resulting damage will be more critical. If the insanity is low, there will be less chance to make a fumble or a critical hit, and the resulting damage will be less critical", value: 45 },
            {  name: "Charisma", description: "Indicates the chance to attack first in the next round", value: 17 },
            {  name: "Constitution", description: "Indicates the number of Hit Points an adventurer starts with", value: 13 },
            { name: "Strength", description: "Manages the chance of success when using a melee weapon, and the damage a melee weapon does", value: 5 }
        
        ],
        equipment: {
            armors: [],
            weapons: [],
            artifacts: [],
            healing_potions: [],
            antidote_potions: [],
            enhancer_potions: [],
        }
    },
    tasks: [],
    gold: 3919,
    created_date: "2024-09-09T09:29:36.983Z"
};
