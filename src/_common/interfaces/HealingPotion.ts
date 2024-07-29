export interface HealingPotion {
    _id: string,
    name: string,
    description: string,
    image: string,
    type: string,
    value: number,
    modifiers: {
        hit_points: number,
        intelligence: Number,
        dexterity: Number,
        constitution: Number,
        insanity: Number,
        charisma: Number,
        strength: Number
    },
    min_lvl: number
}