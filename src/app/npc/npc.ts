import { Alignment } from "./alignments"

import archeTypesJson from '../../resources/archetypes.json'; 
export type BaseStatArray = typeof archeTypesJson.warriorBaseStatArray[0];

import creatureTypesJson from '../../resources/creature_types.json'; 
export type CreatureType = typeof creatureTypesJson[0];

import sizesJson from '../../resources/sizes.json'; 
export type Size = typeof sizesJson[0];

import traitsJson from '../../resources/traits.json'; 
export type Trait = typeof traitsJson.creatureTypeSpecificTraits[0];

import abilitiesJson from '../../resources/abilities.json'; 
export type Ability = typeof abilitiesJson.martialAbilities[0];
export type Reaction = typeof abilitiesJson.reactionAbilities[0];

import levelsJson from '../../resources/levels.json';
export type LevelConfig = typeof levelsJson[0];

export type NPC = {
    // Overview
    name: string,
    biography: string,
    alignment: Alignment,

    // Attributes
    str: number,
    agi: number,
    con: number,
    int: number,
    spi: number,
    per: number,
    cha: number,

    // Core
    levelConfig: LevelConfig,
    martialLevel: number,
    spellLevel: number,

    baseStatArray: BaseStatArray,
    creatureType: CreatureType,
    creatureSize: Size,

    mp: number,
    specialMovement: string[],

    // Defenses
    hp: number,
    hardnessBonus: number,
    dodgeBonus: number,
    toughnessBonus: number,
    willpowerBonus: number,

    resistances: string[],
    immunities: string[],
    conditionImmunies: string[],
    vulnurabilities: string[],

    shieldBlock: number,
    shieldThreshold: number,

    // Actions
    abilities: Ability[],
    reactions: Reaction[]

    // Other
    traits: Trait[],
    loot: string[]
}

export function createEmptyNPC(): NPC {
    return {
        name: '',
        biography: '',
        alignment: Alignment.None,

        str: 0,
        agi: 0,
        con: 0,
        int: 0,
        spi: 0,
        per: 0,
        cha: 0,

        levelConfig: levelsJson[0],
        martialLevel: 0,
        spellLevel: 0,

        baseStatArray: archeTypesJson.warriorBaseStatArray[0],
        creatureType: creatureTypesJson[0],
        creatureSize: sizesJson[2],

        mp: 6,
        specialMovement: [],

        hp: 0,
        hardnessBonus: 0,
        dodgeBonus: 0,
        toughnessBonus: 0,
        willpowerBonus: 0,

        resistances: [],
        immunities: [],
        vulnurabilities: [],
        conditionImmunies: [],

        shieldBlock: 0,
        shieldThreshold: 0,

        abilities: [],
        reactions: [],

        traits: [],
        loot: []
    };
}