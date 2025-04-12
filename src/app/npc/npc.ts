import { Alignment } from "./alignments"

import archeTypesJson from '../../resources/archetypes.json'; 
export type BaseStatArray = typeof archeTypesJson.warriorBaseStatArray[0];

import creatureTypesJson from '../../resources/creature_types.json'; 
export type CreatureType = typeof creatureTypesJson[0];
const subType = creatureTypesJson[0].availibleSubTypes[0]
export type CreatureSubType = typeof subType;

import sizesJson from '../../resources/sizes.json'; 
export type CreatureSize = typeof sizesJson[0];

import traitsJson from '../../resources/traits.json'; 
export type Trait = typeof traitsJson.creatureTypeSpecificTraits[0];

import abilitiesJson from '../../resources/abilities.json'; 
export type Ability = typeof abilitiesJson.movementAbilities[0];
export type Reaction = typeof abilitiesJson.reactionAbilities[0];

import levelsJson from '../../resources/levels.json';
export type LevelConfig = typeof levelsJson[0];

export type NPC = {
    // Overview
    name: string,
    biography: string,
    alignment: Alignment,

    // Core
    levelConfig: LevelConfig,
    archeTypeBaseStatArrays: BaseStatArray[],
    creatureType: CreatureType,
    freeCreatureTrait: Trait | undefined,
    creatureSubType: CreatureSubType,
    freeSubCreatureTrait: Trait | undefined,
    creatureSize: CreatureSize,
    specialMovement: string[],

    // traitSpecificBonuses
    mpBonus: number,
    additionalNpcCreationPoints: number,
    baseHpBonus: number,
    hpPerLevelBonuses: number,

    // Attributes
    strBonus: number,
    agiBonus: number,
    conBonus: number,
    intBonus: number,
    spiBonus: number,
    perBonus: number,
    chaBonus: number,
    primaryAttributeBoost: Attributes,
    secondaryAttributeBoost: Attributes

    // Defenses
    hardnessBonus: number,
    dodgeBonus: number,
    toughnessBonus: number,
    willpowerBonus: number,

    additionalResistances: { type: string, value: string }[],
    additionalImmunities: string[],
    additionalStatusEffectImmunities: string[],
    additionalVulnurabilities: string[],

    shieldBlock: number,
    shieldThreshold: number,

    // Abilities
    preDefinedAbilities: Ability[],
    customAbilities: Ability[],
    reactions: Reaction[]

    // Other
    traits: Trait[],
    loot: string[]
}

export enum ArcheTypes {
    WARRIOR = 'Warrior',
    SPELLCASTER = 'Spellcaster',
    EXPERT = 'Expert'
}
  
export enum Attributes {
    STR = 'STR', AGI = 'AGI', CON = 'CON', INT = 'INT', SPI = 'SPI', PER = 'PER', CHA = 'CHA'
}