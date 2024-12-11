export const populatedPlayer = {
    "equipment": {
      "weapon": {
        "_id": "668bca115319ea9afdff0725",
        "name": "Twirling Yo-yo",
        "description": "A seemingly playful toy with a hidden edge, the Twirling Yo-yo is a versatile weapon in the right hands.",
        "type": "weapon",
        "image": "/images/equipment/weapons/weapon_init_3.png",
        "value": 10,
        "base_percentage": 15,
        "modifiers": {
          "intelligence": 5,
          "dexterity": 0,
          "constitution": 0,
          "insanity": 8,
          "charisma": -6,
          "strength": 0
        },
        "min_lvl": 1,
        "die_faces": 6,
        "die_modifier": 6,
        "die_num": 2
      },
      "armor": {
        "_id": "66f3e0f7b32d7add9a087691",
        "name": "Guardian's Armament",
        "description": "A special armor that protects its bearer with ancient magic.",
        "type": "armor",
        "image": "/images/equipment/armors/heavy_armor_28.png",
        "value": 870,
        "defense": 75,
        "modifiers": {
          "strength": -8,
          "constitution": 0,
          "dexterity": 20,
          "intelligence": 25,
          "insanity": 0,
          "charisma": 20
        },
        "isUnique": false,
        "isActive": true,
        "min_lvl": 15
      },
      "artifact": {
        "_id": "66f66ae44a8f1157dab87b69",
        "name": "Amulet of Warcry",
        "description": "Enhances the power of battle cries.",
        "type": "artifact",
        "image": "/images/equipment/artifacts/artifact_20.png",
        "value": 200,
        "modifiers": {
          "intelligence": 3,
          "dexterity": 2,
          "constitution": 8,
          "insanity": 1,
          "charisma": 6,
          "strength": 6
        },
        "min_lvl": 15,
        "isActive": true,
        "isUnique": false
      },
      "antidote_potion": "668bca125319ea9afdff075e",
      "healing_potion": "668bca125319ea9afdff0754",
      "enhancer_potion": "66f27c81c114335cadf45d70",
      "helmet": {
        "_id": "66f3b3ddc8cdd090db911d96",
        "name": "Helm of Eternal Flames",
        "description": "Burns with the fire of the eternal.",
        "type": "helmet",
        "image": "/images/equipment/helmets/helmet_25.png",
        "value": 190,
        "defense": 27,
        "modifiers": {
          "intelligence": 3,
          "dexterity": 6,
          "constitution": 5,
          "insanity": 1,
          "charisma": 2,
          "strength": 4
        },
        "min_lvl": 11,
        "isUnique": false,
        "isActive": true
      },
      "boot": {
        "_id": "66d99a807518eb499003535f",
        "name": "Beggar's path",
        "description": "Cheap sinister leather shoes.",
        "type": "boot",
        "image": "/images/equipment/boots/boot_initial.png",
        "value": 5,
        "defense": 4,
        "modifiers": {
          "intelligence": 0,
          "dexterity": 0,
          "constitution": 0,
          "insanity": 0,
          "charisma": 0,
          "strength": 0
        },
        "min_lvl": 1
      },
      "ring": {
        "_id": "66a6d6c8dfbffe7e6503970f",
        "name": "Ring of Eternal Flame",
        "description": "A ring that burns with eternal fire.",
        "type": "ring",
        "image": "/images/equipment/rings/ring_1.png",
        "value": 10,
        "modifiers": {
          "intelligence": 2,
          "dexterity": 0,
          "constitution": 0,
          "insanity": 0,
          "charisma": 0,
          "strength": 2
        },
        "min_lvl": 1
      }
    },
    "inventory": {
      "ingredients": [
        {
          "_id": "6702b39d76863c206a48cccb",
          "name": "Crimson Lotus",
          "description": "A sacred flower that boosts one's health noticeably.",
          "value": 110,
          "effects": ["increase_hit_points"],
          "image": "/images/ingredients/increase/increase_2.webp",
          "type": "ingredient"
        },
        {
          "_id": "6702b39d76863c206a48cccb",
          "name": "Crimson Lotus",
          "description": "A sacred flower that boosts one's health noticeably.",
          "value": 110,
          "effects": ["increase_hit_points"],
          "image": "/images/ingredients/increase/increase_2.webp",
          "type": "ingredient"
        }
      ],
      "helmets": [],
      "weapons": [
        {
          "_id": "66f97720f9a28c1fef4dfca1",
          "name": "Rustsplit Axe",
          "description": "An axe made of rusted steel.",
          "type": "weapon",
          "image": "/images/equipment/weapons/axe_7.png",
          "value": 90,
          "base_percentage": 5,
          "modifiers": {
            "intelligence": 0,
            "dexterity": 0,
            "constitution": 0,
            "insanity": 0,
            "charisma": 0,
            "strength": -5
          },
          "min_lvl": 3,
          "die_faces": 10,
          "die_modifier": 2,
          "die_num": 2,
          "isUnique": false,
          "isActive": true
        },
        {
          "_id": "66f98116f9a28c1fef4dfcb0",
          "name": "Ironstorm Maul",
          "description": "A medium hammer known for its durability in battle.",
          "type": "weapon",
          "image": "/images/equipment/weapons/hammer_6.png",
          "value": 400,
          "base_percentage": 8,
          "modifiers": {
            "intelligence": 0,
            "dexterity": 0,
            "constitution": 0,
            "insanity": 0,
            "charisma": 0,
            "strength": -10
          },
          "min_lvl": 8,
          "die_faces": 12,
          "die_modifier": 15,
          "die_num": 5,
          "isUnique": false,
          "isActive": true
        }
      ],
      "armors": [
        {
          "_id": "668bca105319ea9afdff0707",
          "name": "Heavy Ironcoat",
          "description": "Thick and durable, offers strong protection but limits movement.",
          "type": "armor",
          "image": "/images/equipment/armors/jacket_5.png",
          "value": 10,
          "defense": 40,
          "modifiers": {
            "intelligence": 0,
            "dexterity": -3,
            "constitution": 0,
            "insanity": 0,
            "charisma": 0,
            "strength": -9
          },
          "min_lvl": 1
        },
        {
          "_id": "66f289b5e5be15925dc0abdc",
          "name": "Titan's Ward",
          "description": "Forged from the heart of a dying star.",
          "type": "armor",
          "image": "/images/equipment/armors/full_plate_5.png",
          "value": 1000,
          "defense": 110,
          "modifiers": {
            "intelligence": 15,
            "dexterity": 10,
            "constitution": 15,
            "insanity": 0,
            "charisma": 10,
            "strength": 0
          },
          "min_lvl": 14,
          "isUnique": true,
          "isActive": true
        }
      ],
      "shields": [],
      "artifacts": [],
      "boots": [],
      "rings": [],
      "antidote_potions": [],
      "healing_potions": [],
      "enhancer_potions": [],
      "defensive_trees": []
    },
    "statistics": {
      "level": 15,
      "hit_points": 300,
      "max_hit_points": 300,
      "defense": 99,
      "strength": 3,
      "dexterity": 2,
      "constitution": 4,
      "intelligence": 5,
      "insanity": 2,
      "charisma": 4
    },
    "tasks": {
      "completed": [
        {
          "task_id": "1",
          "name": "Defeat the Dragon",
          "description": "Slay the mighty dragon that has been terrorizing the village."
        }
      ],
      "active": [
        {
          "task_id": "2",
          "name": "Retrieve the Ancient Artifact",
          "description": "Find and retrieve the lost artifact from the abandoned temple."
        }
      ]
    }
  }
  