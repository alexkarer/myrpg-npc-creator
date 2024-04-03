import { NONE_TYPE } from "@angular/compiler"
import { Action } from "./action"
import { Alignment } from "./alignment"
import { Reaction } from "./reactions"
import { Trait } from "./trait"
import { CreatureType, creatureTypeHuman } from './creatureTypes';
import { CreatureSize, medium } from "./creatureSize"

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
    hardness: number,
    dodge: number,
    toughness: number,
    willpower: number,

    resistances: string[],
    immunities: string[],
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

        str: 0,
        agi: 0,
        con: 0,
        int: 1,
        spi: 0,
        per: 0,
        cha: 1,

        level: 0.25,
        martialLevel: 0,
        spellLevel: 0,

        creatureType: creatureTypeHuman,
        creatureSize: medium,

        mp: 6,
        ap: 0,
        specialMovement: [],

        hp: 0,
        hardness: 0,
        dodge: 0,
        toughness: 0,
        willpower: 0,

        resistances: [],
        immunities: [],
        vulnurabilities: [],

        shieldBlock: 0,
        shieldThreshold: 0,

        actions: [],
        reactions: [],

        traits: [],
        xp: 0,
        loot: []
    };
}