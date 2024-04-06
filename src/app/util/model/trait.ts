export type Trait = {
    title: string,
    description: string,
    npcPointsCost: number
};

export const movementTraits: Trait[] = [
    { npcPointsCost: 1, title: 'Fast', description: 'Increase Movement by +2 MP' },
    { npcPointsCost: 3, title: 'Fly', description: 'Gain special movement fly(3m)' },
    { npcPointsCost: 1, title: 'Aquan', description: 'Gain special movement swim(3m) and can breathe in water' },
    { npcPointsCost: 2, title: 'Pounce', description: 'When the creature ends a jump move within melee creature of at least 1 creature, it can choose one creature, that creature has to make a HardnessSave against 10 + Strength + MartialLevel or fall prone.' }
];

export const defensiveTraits: Trait[] = [
    { npcPointsCost: 1, title: 'Tank', description: 'Increase HP by 2 ∗ Level' },
    { npcPointsCost: 1, title: 'Resistance I', description: 'Gain resistance: 5 + Level against any damage type' },
    { npcPointsCost: 2, title: 'Resitance II', description: 'Gain resistance: 10 + 2 ∗ Level against any damage type' },
    { npcPointsCost: 3, title: 'Immunity', description: 'Gain immunity against a damage type' },
    { npcPointsCost: 1, title: 'Condition Immunity I', description: 'Gain immunity against a Tier I status effect' },
    { npcPointsCost: 2, title: 'Condition Immunity II', description: 'Gain immunity against a Tier II status effect' },
    { npcPointsCost: 3, title: 'Condition Immunity III', description: 'Gain immunity against a Tier III status effect' },
    { npcPointsCost: 1, title: 'Hardness Increase', description: 'Increase Hardness by +2.' },
    { npcPointsCost: 2, title: 'Dodge Increase', description: 'Increase Dodge by +2.' },
    { npcPointsCost: 2, title: 'Toughness Increase', description: 'Increase Toughness by +2' },
    { npcPointsCost: 2, title: 'Willpower Increase', description: 'Increase Willpower by +2' }
];

export const wargearTraits: Trait[] = [
    { npcPointsCost: 1, title: 'Small Shield', description: 'Gets a small shield, 12+Martial Level shield block, 15 damage threshold' }
];


export function getAllTraits(): Trait[] {
    let traits: Trait[] = [];
    traits.push(...movementTraits);
    traits.push(...defensiveTraits);
    traits.push(...wargearTraits);
    return traits;
}