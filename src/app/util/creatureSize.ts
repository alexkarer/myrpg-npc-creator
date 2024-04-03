import { Trait } from './trait';
export type CreatureSize = {
    name: string,
    strBonus: number,
    dodgeBonus: number,
    hpPerLevel: number,
    npcCreationPointsCost: number,
}

export const tiny: CreatureSize = { name: 'Tiny', strBonus: -4, dodgeBonus: +6, hpPerLevel: 4, npcCreationPointsCost: 0 };
export const small: CreatureSize = { name: 'Small', strBonus: -2, dodgeBonus: +3, hpPerLevel: 5, npcCreationPointsCost: 0 };
export const medium: CreatureSize = { name: 'Medium', strBonus: 0, dodgeBonus: 0, hpPerLevel: 6, npcCreationPointsCost: 0 };
export const large: CreatureSize = { name: 'Large', strBonus: +2, dodgeBonus: -3, hpPerLevel: 8, npcCreationPointsCost: 1 };
export const huge: CreatureSize = { name: 'Huge', strBonus: +4, dodgeBonus: -6, hpPerLevel: 12, npcCreationPointsCost: 2 };
export const gargantuan: CreatureSize = { name: 'Gargantuan', strBonus: +6, dodgeBonus: -9, hpPerLevel: 16, npcCreationPointsCost: 3 };
export const titanic: CreatureSize =  { name: 'Titanic', strBonus: +8, dodgeBonus: -12, hpPerLevel: 20, npcCreationPointsCost: 4 };

export const creatureSizes: CreatureSize[] = [
    tiny,
    small,
    medium,
    large,
    huge,
    gargantuan,
    titanic
];