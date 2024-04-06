import { DiceExpression, Die } from './DiceExpression';
import { AttributeModifiers } from "./creatureTypes"

export type BaseStatArray = {
    level: number,
    attributeModifiers: AttributeModifiers,
    martialLevel: number,
    spellcastingLevel: number,

    hardness: number,
    dodge: number,
    toughness: number,
    willpower: number,

    highBaseDamage: DiceExpression,
    baseDamage: DiceExpression,
    lowBaseDamage?: DiceExpression
}

export enum BaseStatArrays {
    FIGHTER='Fighter', SPELLCASTER='Spellcaster', SPECIALIST='Specialist', HYBRID='Hybrid'
}

export const fighterBaseStatArrays: BaseStatArray[] = [
    {
        level: 0.25,
        attributeModifiers: { str: 2, agi: 1, con: 1, int: 0, spi: 0, per: 1, cha: 0 },
        martialLevel: 1, spellcastingLevel: 0,
        hardness: 1, dodge: 0, toughness: 1, willpower: 0,
        highBaseDamage: { dice: [ { amount: 2, die: Die.D4 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 1, die: Die.D4 } ], constant: 0 }
    },
    {
        level: 0.5,
        attributeModifiers: { str: 2, agi: 2, con: 2, int: 0, spi: 0, per: 1, cha: 0 },
        martialLevel: 1, spellcastingLevel: 0,
        hardness: 1, dodge: 1, toughness: 1, willpower: 0,
        highBaseDamage: { dice: [ { amount: 2, die: Die.D6 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 1, die: Die.D6 } ], constant: 0 }
    },
    {
        level: 1,
        attributeModifiers: { str: 3, agi: 3, con: 2, int: 0, spi: 0, per: 2, cha: 0 },
        martialLevel: 1, spellcastingLevel: 0,
        hardness: 1, dodge: 1, toughness: 1, willpower: 0,
        highBaseDamage: { dice: [ { amount: 2, die: Die.D8 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 1, die: Die.D10 } ], constant: 0 },
        lowBaseDamage: { dice: [ { amount: 1, die: Die.D4 } ], constant: 0 }
    },
    {
        level: 2,
        attributeModifiers: { str: 3, agi: 3, con: 3, int: 0, spi: 1, per: 2, cha: 0 },
        martialLevel: 2, spellcastingLevel: 0,
        hardness: 2, dodge: 1, toughness: 2, willpower: 0,
        highBaseDamage: { dice: [ { amount: 4, die: Die.D6 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 2, die: Die.D6 } ], constant: 0 },
        lowBaseDamage: { dice: [ { amount: 1, die: Die.D6 } ], constant: 0 }
    },
    {
        level: 3,
        attributeModifiers: { str: 4, agi: 3, con: 3, int: 0, spi: 1, per: 2, cha: 0 },
        martialLevel: 3, spellcastingLevel: 0,
        hardness: 3, dodge: 2, toughness: 3, willpower: 1,
        highBaseDamage: { dice: [ { amount: 4, die: Die.D8 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 2, die: Die.D8 } ], constant: 0 },
        lowBaseDamage: { dice: [ { amount: 1, die: Die.D8 } ], constant: 0 }
    },
    {
        level: 4,
        attributeModifiers: { str: 4, agi: 3, con: 4, int: 0, spi: 1, per: 2, cha: 0 },
        martialLevel: 4, spellcastingLevel: 0,
        hardness: 4, dodge: 2, toughness: 4, willpower: 1,
        highBaseDamage: { dice: [ { amount: 4, die: Die.D10 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 2, die: Die.D10 } ], constant: 0 },
        lowBaseDamage: { dice: [ { amount: 1, die: Die.D10 } ], constant: 0 }
    },
    {
        level: 5,
        attributeModifiers: { str: 4, agi: 4, con: 4, int: 1, spi: 1, per: 3, cha: 0 },
        martialLevel: 5, spellcastingLevel: 0,
        hardness: 5, dodge: 3, toughness: 5, willpower: 1,
        highBaseDamage: { dice: [ { amount: 4, die: Die.D12 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 2, die: Die.D12 } ], constant: 0 },
        lowBaseDamage: { dice: [ { amount: 1, die: Die.D12 } ], constant: 0 }
    },
    {
        level: 6,
        attributeModifiers: { str: 5, agi: 4, con: 5, int: 1, spi:2, per: 3, cha: 0 },
        martialLevel: 6, spellcastingLevel: 1,
        hardness: 6, dodge: 4, toughness: 6, willpower: 2,
        highBaseDamage: { dice: [ { amount: 8, die: Die.D6 } ], constant: 0 },
        baseDamage: { dice: [ { amount: 4, die: Die.D6 } ], constant: 0 },
        lowBaseDamage: { dice: [ { amount: 2, die: Die.D6 } ], constant: 0 }
    }
]