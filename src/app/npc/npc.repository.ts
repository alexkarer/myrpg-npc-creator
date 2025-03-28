import { Injectable } from "@angular/core";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { NPC, LevelConfig, BaseStatArray, CreatureType, CreatureSize, Trait, Ability, Reaction } from './npc';
import { Alignment } from "./alignments";

import creatureTypesJson from '../../resources/creature_types.json'; 
import sizesJson from '../../resources/sizes.json'; 
import levelsJson from '../../resources/levels.json';
import archeTypesJson from '../../resources/archetypes.json'; 
import traitsJson from '../../resources/traits.json';

const npcStore = createStore(
    { name: 'npc'},
    withProps<NPC>({ name: '',
        biography: '',
        alignment: Alignment.None,

        levelConfig: levelsJson[0],
        archeTypeBaseStatArrays: archeTypesJson.warriorBaseStatArray,
        creatureType: creatureTypesJson[0],
        freeCreatureTrait: traitsJson.creatureTypeSpecificTraits[0],
        creatureSize: sizesJson[2],
        specialMovement: [],

        mpBonus: 0,
        additionalNpcCreationPoints: 0,
        hpPerLevelBonuses: 0,

        strBonus: 0,
        agiBonus: 0,
        conBonus: 0,
        intBonus: 0,
        spiBonus: 0,
        perBonus: 0,
        chaBonus: 0,

        hardnessBonus: 0,
        dodgeBonus: 0,
        toughnessBonus: 0,
        willpowerBonus: 0,

        additionalResistances: [],
        additionalImmunities: [],
        additionalVulnurabilities: [],
        additionalStatusEffectImmunities: [],

        shieldBlock: 0,
        shieldThreshold: 0,

        abilities: [],
        reactions: [],

        traits: [],
        loot: []
     })
);

@Injectable({providedIn: 'root'})
export class NpcRepository {
    $name = npcStore.pipe(select(state => state.name === '' ? 'Name' : state.name));
    $alignment = npcStore.pipe(select(state => state.alignment));
    $availibleNpcCreationPoints = npcStore.pipe(select(state => this.getBaseStatArray(state).npcCreationPoints + state.additionalNpcCreationPoints));
    $usedNpcCreationPoints = npcStore.pipe(select(state => 
        state.creatureSize.pointsCost + 
        state.creatureType.pointsCost + 
        state.traits.map(t => t.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.abilities.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.reactions.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0)
    ));

    $level = npcStore.pipe(select(state => state.levelConfig.level));
    $xp = npcStore.pipe(select(state => state.levelConfig.XP));
    $martialLevel = npcStore.pipe(select(state => this.getBaseStatArray(state).levels.martialLevel));
    $spellLevel = npcStore.pipe(select(state => this.getBaseStatArray(state).levels.spellLevel));

    $creatureType = npcStore.pipe(select(state => state.creatureType.name));
    $creatureSize = npcStore.pipe(select(state => state.creatureSize.name));

    $ap = npcStore.pipe(select(state => state.levelConfig.AP));
    $mp = npcStore.pipe(select(state => 6 + state.mpBonus + Math.floor(this.calculateAgi(state)/3)));
    $specialMovement = npcStore.pipe(select(state => state.specialMovement.join(', ')));

    $str = npcStore.pipe(select(state => this.calculateStr(state)));
    $agi = npcStore.pipe(select(state => this.calculateAgi(state)));
    $con = npcStore.pipe(select(state => this.calculateCon(state)));
    $int = npcStore.pipe(select(state => state.intBonus + this.getBaseStatArray(state).attributes.int + state.creatureType.attributeBonsuses.int));
    $spi = npcStore.pipe(select(state => state.spiBonus + this.getBaseStatArray(state).attributes.spi + state.creatureType.attributeBonsuses.spi));
    $per = npcStore.pipe(select(state => this.calculatePer(state)));
    $cha = npcStore.pipe(select(state => state.chaBonus + this.getBaseStatArray(state).attributes.cha + state.creatureType.attributeBonsuses.cha));

    $meleeMartialAttack = npcStore.pipe(select(state => 10 + this.calculateAgi(state) + this.getBaseStatArray(state).levels.martialLevel));
    $rangedMartialAttack = npcStore.pipe(select(state => 10 + this.calculatePer(state) + this.getBaseStatArray(state).levels.martialLevel));
    $meleeSpellAttack = npcStore.pipe(select(state => 10 + this.calculateAgi(state) + this.getBaseStatArray(state).levels.spellLevel));
    $rangedSpellAttack = npcStore.pipe(select(state => 10 + this.calculatePer(state) + this.getBaseStatArray(state).levels.spellLevel));

    $hp = npcStore.pipe(select(state => this.getBaseStatArray(state).hpBonus + Math.floor((state.creatureSize.hpPerLevel + state.hpPerLevelBonuses + Math.floor(this.calculateCon(state) / 2)) * state.levelConfig.level)));
    $hardness = npcStore.pipe(select(state => 10 + this.calculateStr(state) + this.getBaseStatArray(state).defenseBonus.hardness + state.hardnessBonus));
    $dodge = npcStore.pipe(select(state => 10 + this.calculateAgi(state) + this.getBaseStatArray(state).defenseBonus.dodge + state.dodgeBonus));
    $toughness = npcStore.pipe(select(state => 10 + this.calculateCon(state) + this.getBaseStatArray(state).defenseBonus.toughness + state.toughnessBonus));
    $willpower = npcStore.pipe(select(state => 10 + this.calculateSpi(state) + this.getBaseStatArray(state).defenseBonus.willpower + state.willpowerBonus));
    $shieldBlock = npcStore.pipe(select(state =>  state.shieldBlock === 0 ? 0 : this.getBaseStatArray(state).levels.martialLevel + state.shieldBlock));
    $shieldThreshold = npcStore.pipe(select(state => state.shieldThreshold));

    $damageResistances = npcStore.pipe(select(state => this.flattenDamageResistances(state)));
    $damageImmunities = npcStore.pipe(select(state => [...state.creatureType.damageImmunities, ...state.additionalImmunities].join(', ')));
    $statusEffectImmunties = npcStore.pipe(select(state => [...state.creatureType.statusEffectImmunities, ...state.additionalStatusEffectImmunities].join(', ')));
    $damageVulnurabilities = npcStore.pipe(select(state => [...state.creatureType.damageVulnurabilities, ...state.additionalVulnurabilities].join(', ')));

    $traits = npcStore.pipe(select(state => state.freeCreatureTrait === undefined ? state.traits : [...state.traits, state.freeCreatureTrait]));
    $abilities = npcStore.pipe(select(state => state.abilities));
    $reactions = npcStore.pipe(select(state => state.reactions));

    updateName(name: string) {
        npcStore.update(setProp('name', name));
    }

    updateAlignment(alignment: Alignment) {
        npcStore.update(setProp('alignment', alignment));
    }

    updateLevel(levelConfig: LevelConfig) {
        npcStore.update(setProp('levelConfig', levelConfig));
    }

    updateBaseStatArray(bsas: BaseStatArray[]) {
        npcStore.update(setProp('archeTypeBaseStatArrays', bsas));
    }

    updateCreatureType(type: CreatureType) {
        let freeTrait = traitsJson.creatureTypeSpecificTraits.find(t => t.name === type.freeTraitName);
        npcStore.update(setProp('freeCreatureTrait', existingFreeTrait => {
            //if (existingFreeTrait) { this.removeTraitsCharacteristics(existingFreeTrait.name); }
            return freeTrait;
        }));
        //if (freeTrait) { this.applyTraitsCharacteristics(freeTrait.name); }

        npcStore.update(setProp('creatureType', type));
    }

    updateCreatureSize(size: CreatureSize) {
        npcStore.update(setProp('creatureSize', size));
    }

    addTrait(trait: Trait) {
        this.applyTraitsCharacteristics(trait.name);
        npcStore.update(setProp('traits', traits => [...traits, trait]));
    }

    removeTrait(trait: Trait) {
        this.removeTraitsCharacteristics(trait.name);
        npcStore.update(setProp('traits', traits => traits.filter(t => t.name !== trait.name)));
    }

    addAbility(ability: Ability) {
        npcStore.update(setProp('abilities', existingAbilities => [...existingAbilities, ability]));
    }

    removeAbility(ability: Ability) {
        npcStore.update(setProp('abilities', existingAbilities => existingAbilities.filter(a => a.name !== ability.name)));
    }

    addReaction(reaction: Reaction) {
        npcStore.update(setProp('reactions', existingReactions => [...existingReactions, reaction]));
    }

    removeReaction(reaction: Reaction) {
        npcStore.update(setProp('reactions', existingReactions => existingReactions.filter(r => r.name !== reaction.name)));
    }

    private getBaseStatArray(state: NPC): BaseStatArray {
        let bsa = state.archeTypeBaseStatArrays.find(bsa => bsa.levels.level === state.levelConfig.level);
        return bsa ? bsa : archeTypesJson.warriorBaseStatArray[0];
    }

    private calculateStr(state: NPC): number {
        return state.strBonus + this.getBaseStatArray(state).attributes.str + state.creatureType.attributeBonsuses.str + state.creatureSize.strBonus;
    }

    private calculateAgi(state: NPC): number {
        return state.agiBonus + this.getBaseStatArray(state).attributes.agi + state.creatureType.attributeBonsuses.agi;
    }

    private calculateCon(state: NPC): number {
        return state.conBonus + this.getBaseStatArray(state).attributes.con + state.creatureType.attributeBonsuses.con;
    }

    private calculateSpi(state: NPC): number {
        return state.spiBonus + this.getBaseStatArray(state).attributes.spi + state.creatureType.attributeBonsuses.spi;
    }

    private calculatePer(state: NPC): number {
        return state.perBonus + this.getBaseStatArray(state).attributes.per + state.creatureType.attributeBonsuses.per;
    }

    private flattenDamageResistances(state: NPC): string {
        return [...state.creatureType.damageResistances, ...state.additionalResistances]
            .map(dmgR => dmgR.type + ' ' + dmgR.value)
            .map(str => str.replaceAll('[HALF LEVEL]', Math.floor(state.levelConfig.level / 2).toString()))
            .sort((s1, s2) => s1.localeCompare(s2))
            .join(', ');
    }

    // trait characteristics functions
    private updateAvailibleNpcPoints(points: number) {
        npcStore.update(setProp('additionalNpcCreationPoints', p => p + points));
    }
    private updateMpBonus(mp: number) {
        npcStore.update(setProp('mpBonus', mpBonus => mpBonus + mp));
    }
    private addSpecialMovement(move: string) {
        npcStore.update(setProp('specialMovement', sm => [...sm, move]));
    }
    private removeSpecialMovement(move: string) {
        npcStore.update(setProp('specialMovement', sm => sm.filter(spec => spec !== move)));
    }
    private updateHpPerLevelBonus(hp: number) {
        npcStore.update(setProp('hpPerLevelBonuses', hpBonus => hpBonus + hp));
    }
    private addDamageResistance(dmgResistance: { type: string, value: string }) {
        npcStore.update(setProp('additionalResistances', dmg => [...dmg, dmgResistance]));
    }
    private removeDamageResistance(dmgResistance: { type: string, value: string }) {
        npcStore.update(setProp('additionalResistances', dmg => dmg.filter(d => d !== dmgResistance)));
    }

    private applyTraitsCharacteristics(traitName: string) {
        switch(traitName) {
            case 'Human Versatility':
                this.updateAvailibleNpcPoints(1);
                break;
            case 'Elven Nimbleness':
                this.updateMpBonus(1);
                break;
            case 'Dwarven Nightvision':
                break;
            case 'Undead':
                break;
            case 'Fire Elemental':
                break;
            case 'Air Elemental':
                this.addSpecialMovement("fly(1.5m)");
                break;
            case 'Water Elemental':
                this.addSpecialMovement("swim(1.5m)");
                break;
            case 'Immortal':
                break;
            case 'Nimble I':
                this.updateMpBonus(1);
                break;
            case 'Nimble II':
                this.updateMpBonus(2);
                break;
            case 'Nimble III':
                this.updateMpBonus(3);
                break;
            case 'Fly I':
                this.addSpecialMovement("fly(1.5m)");
                break;
            case 'Fly II':
                break;
            case 'Fly III':
                break;
            case 'Tank I':
                this.updateHpPerLevelBonus(2);
                break;
            case 'Armor I':
                this.addDamageResistance({ type: "physical", value: "2"});
                break;
            case 'Armor II':
                break;
            case 'Armor III':
                break;
            case 'Armor IV':
                break;
            case 'Nightvision I':
                break;
            case 'Nightvision II':
                break;
            case 'Nightvision III':
                break;
            default:
                console.error('Unkown trait ' + traitName + ' unable to apply characteristics');
        }
    }

    private removeTraitsCharacteristics(traitName: string) {
        switch(traitName) {
            case 'Human Versatility':
                this.updateAvailibleNpcPoints(-1);
                break;
            case 'Elven Nimbleness':
                this.updateMpBonus(-1);
                break;
            case 'Dwarven Nightvision':
                break;
            case 'Undead':
                break;
            case 'Fire Elemental':
                break;
            case 'Air Elemental':
                this.removeSpecialMovement("fly(1.5m)");
                break;
            case 'Water Elemental':
                this.removeSpecialMovement("swim(1.5m)");
                break;
            case 'Immortal':
                break;
            case 'Nimble I':
                this.updateMpBonus(-1);
                break;
            case 'Nimble II':
                this.updateMpBonus(-2);
                break;
            case 'Nimble III':
                this.updateMpBonus(-3);
                break;
            case 'Fly I':
                this.removeSpecialMovement("fly(1.5m)");
                break;
            case 'Fly II':
                break;
            case 'Fly III':
                break;
            case 'Tank I':
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Armor I':
                this.removeDamageResistance({ type: "physical", value: "2"});
                break;
            case 'Armor II':
                break;
            case 'Armor III':
                break;
            case 'Armor IV':
                break;
            case 'Nightvision I':
                break;
            case 'Nightvision II':
                break;
            case 'Nightvision III':
                break;
            default:
                console.error('Unkown trait ' + traitName + ' unable to apply characteristics');
        }
    }
}