import { Action } from "./action"
import { Alignment } from "./alignment"
import { Reaction } from "./reactions"
import { Trait } from "./trait"
import { CreatureType, creatureTypeHuman } from './creatureTypes';
import { CreatureSize, medium } from "./creatureSize"
import { BaseStatArrays } from './baseStatArray';

export type NPC = {
    // Overview
    name: string,
    biography: string,
    alignment: Alignment,
    baseStatArray: BaseStatArrays,

    // Attributes
    str: number,
    agi: number,
    con: number,
    int: number,
    spi: number,
    per: number,
    cha: number,

    // Core
    level: number,
    martialLevel: number,
    spellLevel: number,

    creatureType: CreatureType,
    creatureSize: CreatureSize,

    mp: number,
    ap: number,
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
    actions: Action[],
    reactions: Reaction[]

    // Other
    traits: Trait[],
    xp: number,
    loot: string[]
}

export function createEmptyNPC(): NPC {
    return {
        name: '',
        biography: '',
        alignment: Alignment.None,
        baseStatArray: BaseStatArrays.FIGHTER,

        str: 2,
        agi: 1,
        con: 1,
        int: 1,
        spi: 0,
        per: 1,
        cha: 1,

        level: 0.25,
        martialLevel: 1,
        spellLevel: 0,

        creatureType: creatureTypeHuman,
        creatureSize: medium,

        mp: 6,
        ap: 2,
        specialMovement: [],

        hp: 0,
        hardnessBonus: 1,
        dodgeBonus: 0,
        toughnessBonus: 1,
        willpowerBonus: 0,

        resistances: [],
        immunities: [],
        vulnurabilities: [],
        conditionImmunies: [],

        shieldBlock: 0,
        shieldThreshold: 0,

        actions: [],
        reactions: [],

        traits: [],
        xp: 0,
        loot: []
    };
}