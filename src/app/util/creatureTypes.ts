import { Trait } from "./trait"

export type CreatureType = {
    name: string,
    npcCreationPointsCost: number,
    attributeModifiers: AttributeModifiers,
    damageResistances: string[],
    damageVulnurabilities: string[],
    damageImmunities: string[],
    conditionImmunities: string[],
    freeTrait?: Trait,
    otherBonuses: string,
}

export type AttributeModifiers = {
    str: number,
    agi: number,
    con: number,
    int: number,
    spi: number,
    per: number,
    cha: number
}

export const creatureTypeHuman: CreatureType = {
    name: 'Human',
    npcCreationPointsCost: 0,
    attributeModifiers: {
        str: 0,
        agi: 0,
        con: 0,
        int: 1,
        spi: 0,
        per: 0,
        cha: 1
    },
    damageResistances: [],
    damageVulnurabilities: [],
    damageImmunities: [],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: '1 extra NPC Point',
}

export const creatureTypeDwarf: CreatureType = {
    name: 'Dwarf',
    npcCreationPointsCost: 0,
    attributeModifiers: {
        str: 1,
        agi: 0,
        con: 1,
        int: 0,
        spi: 0,
        per: 0,
        cha: 0
    },
    damageResistances: ['5 + half Level'],
    damageVulnurabilities: [],
    damageImmunities: [],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: '6m tremorsense while on rocky or earthy terrain',
}

export const creatureTypeElf: CreatureType = {
    name: 'Elf',
    npcCreationPointsCost: 0,
    attributeModifiers: {
        str: 0,
        agi: 1,
        con: 0,
        int: 0,
        spi: 1,
        per: 0,
        cha: 0
    },
    damageResistances: [],
    damageVulnurabilities: [],
    damageImmunities: [],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: '+1 MP',
}

export const creatureTypeBeast: CreatureType = {
    name: 'Beast',
    npcCreationPointsCost: 0,
    attributeModifiers: {
        str: 0,
        agi: 0,
        con: 1,
        int: -4,
        spi: -1,
        per: +2,
        cha: 0
    },
    damageResistances: [],
    damageVulnurabilities: [],
    damageImmunities: [],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: '',
}

export const creatureTypeUndead: CreatureType = {
    name: 'Undead',
    npcCreationPointsCost: 1,
    attributeModifiers: {
        str: 0,
        agi: 0,
        con: 3,
        int: -1,
        spi: 0,
        per: 0,
        cha: -3
    },
    damageResistances: [],
    damageVulnurabilities: ['holy'],
    damageImmunities: ['unholy', 'poison'],
    conditionImmunities: ['poisoned', 'bleeding', 'sleeping'],
    freeTrait: {
        title: 'Undead',
        description: "Doesn't need to sleep, drink, eat"
    },
    otherBonuses: '',
}

export const creatureTypeEthereal: CreatureType = {
    name: 'Ethereal',
    npcCreationPointsCost: 1,
    attributeModifiers: {
        str: 0,
        agi: 0,
        con: 0,
        int: 0,
        spi: 3,
        per: 0,
        cha: 0
    },
    damageResistances: ['non-magical physical 5 + Level'],
    damageVulnurabilities: [],
    damageImmunities: ['cosmic'],
    conditionImmunities: [],
    freeTrait: {
        title: 'non-living entity',
        description: 'Doesn’t need to sleep, drink, eat'
    },
    otherBonuses: '',
}

export const creatureTypeEarthElemental: CreatureType = {
    name: 'Earth Elemental',
    npcCreationPointsCost: 1,
    attributeModifiers: {
        str: 1,
        agi: 0,
        con: 1,
        int: 0,
        spi: 0,
        per: 0,
        cha: -1
    },
    damageResistances: ['non-magical physical 5 + Level'],
    damageVulnurabilities: [],
    damageImmunities: ['poison'],
    conditionImmunities: ['poisoned'],
    freeTrait: undefined,
    otherBonuses: '+2 HP per Level',
}

export const creatureTypeFireElemental: CreatureType = {
    name: 'Fire Elemental',
    npcCreationPointsCost: 1,
    attributeModifiers: {
        str: 1,
        agi: 1,
        con: 0,
        int: 0,
        spi: 0,
        per: 0,
        cha: -1
    },
    damageResistances: [],
    damageVulnurabilities: [],
    damageImmunities: ['fire'],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: 'base attack can deal fire damage instead',
}

export const creatureTypeAirElemntal: CreatureType = {
    name: 'Air Elemental',
    npcCreationPointsCost: 1,
    attributeModifiers: {
        str: 0,
        agi: 1,
        con: 0,
        int: 0,
        spi: 0,
        per: 1,
        cha: -1
    },
    damageResistances: [],
    damageVulnurabilities: [],
    damageImmunities: ['lightning'],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: 'free fly (1.5m) speed, base attack can deal lightning damage instead',
}

export const creatureTypeWaterElemental: CreatureType = {
    name: 'Water Elemental',
    npcCreationPointsCost: 1,
    attributeModifiers: {
        str: 0,
        agi: 0,
        con: 1,
        int: 0,
        spi: 0,
        per: 1,
        cha: -1
    },
    damageResistances: [],
    damageVulnurabilities: [],
    damageImmunities: ['acid', 'cold'],
    conditionImmunities: [],
    freeTrait: undefined,
    otherBonuses: 'free swim speed, base attack can deal acid or cold damage',
}

export const creatureTypes: CreatureType[] = [
    creatureTypeHuman,
    creatureTypeDwarf,
    creatureTypeElf,
    creatureTypeBeast,
    creatureTypeUndead,
    creatureTypeEthereal,
    creatureTypeEarthElemental,
    creatureTypeFireElemental,
    creatureTypeAirElemntal,
    creatureTypeWaterElemental
]