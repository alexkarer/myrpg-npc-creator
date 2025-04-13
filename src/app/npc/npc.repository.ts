import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { NPC, LevelConfig, BaseStatArray, CreatureType, CreatureSize, Trait, Ability, Reaction, Attributes, CreatureSubType } from './npc';
import { Alignment } from './alignments';

import creatureTypesJson from '../../resources/creature_types.json'; 
import sizesJson from '../../resources/sizes.json'; 
import levelsJson from '../../resources/levels.json';
import archeTypesJson from '../../resources/archetypes.json'; 
import traitsJson from '../../resources/traits.json';
import martialDamageJson from '../../resources/martial_damage.json';

const npcStore = createStore(
    { name: 'npc'},
    withProps<NPC>({ 
        name: '',
        biography: '',
        alignment: Alignment.Unaligned,

        levelConfig: levelsJson[0],
        archeTypeBaseStatArrays: archeTypesJson.warriorBaseStatArray,
        creatureType: creatureTypesJson[0],
        creatureSubType: creatureTypesJson[0].availibleSubTypes[0],
        freeCreatureTrait: undefined,
        freeSubCreatureTrait: traitsJson.creatureTypeSpecificTraits[0],
        creatureSize: sizesJson[2],
        specialMovement: [],

        mpBonus: 0,
        additionalNpcCreationPoints: 0,
        baseHpBonus: 0,
        hpPerLevelBonuses: 0,

        strBonus: 0,
        agiBonus: 0,
        conBonus: 0,
        intBonus: 0,
        spiBonus: 0,
        perBonus: 0,
        chaBonus: 0,
        primaryAttributeBoost: Attributes.STR,
        secondaryAttributeBoost: Attributes.AGI,

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

        preDefinedAbilities: [],
        customAbilities: [],
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
        state.creatureSubType.pointsCost + 
        state.traits.map(t => t.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.customAbilities.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.preDefinedAbilities.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.reactions.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0)
    ));

    $level = npcStore.pipe(select(state => state.levelConfig.level));
    $xp = npcStore.pipe(select(state => state.levelConfig.XP));
    $martialLevel = npcStore.pipe(select(state => this.getBaseStatArray(state).levels.martialLevel));
    $spellLevel = npcStore.pipe(select(state => this.getBaseStatArray(state).levels.spellLevel));

    $creatureType = npcStore.pipe(select(state => state.creatureType.name));
    $avilibleSubTypes = npcStore.pipe(select(state => state.creatureType.availibleSubTypes));
    $creatureSubType = npcStore.pipe(select(state => state.creatureSubType.name));
    $creatureSize = npcStore.pipe(select(state => state.creatureSize.name));

    $ap = npcStore.pipe(select(state => state.levelConfig.AP));
    $mp = npcStore.pipe(select(state => 6 + state.mpBonus + Math.floor(this.calculateAgi(state)/3)));
    $specialMovement = npcStore.pipe(select(state => state.specialMovement.join(', ')));

    $str = npcStore.pipe(select(state => this.calculateStr(state)));
    $agi = npcStore.pipe(select(state => this.calculateAgi(state)));
    $con = npcStore.pipe(select(state => this.calculateCon(state)));
    $int = npcStore.pipe(select(state => this.calculateInt(state)));
    $spi = npcStore.pipe(select(state => this.calculateSpi(state)));
    $per = npcStore.pipe(select(state => this.calculatePer(state)));
    $cha = npcStore.pipe(select(state => this.calculateCha(state)));
    $primaryAttributeBoost = npcStore.pipe(select(state => state.primaryAttributeBoost));
    $secondaryAttributeBoost = npcStore.pipe(select(state => state.secondaryAttributeBoost));

    $meleeMartialAttack = npcStore.pipe(select(state => 10 + this.calculateAgi(state) + this.getBaseStatArray(state).levels.martialLevel));
    $rangedMartialAttack = npcStore.pipe(select(state => 10 + this.calculatePer(state) + this.getBaseStatArray(state).levels.martialLevel));
    $meleeSpellAttack = npcStore.pipe(select(state => 10 + this.calculateAgi(state) + this.getBaseStatArray(state).levels.spellLevel));
    $rangedSpellAttack = npcStore.pipe(select(state => 10 + this.calculatePer(state) + this.getBaseStatArray(state).levels.spellLevel));

    $hp = npcStore.pipe(select(state => this.getBaseStatArray(state).hpBonus + state.baseHpBonus + Math.floor((state.creatureSize.hpPerLevel + state.hpPerLevelBonuses + Math.floor(this.calculateCon(state) / 2)) * state.levelConfig.level)));
    $hardness = npcStore.pipe(select(state => 10 + this.calculateStr(state) + this.getBaseStatArray(state).defenseBonus.hardness + state.hardnessBonus));
    $dodge = npcStore.pipe(select(state => 10 + this.calculateAgi(state) + this.getBaseStatArray(state).defenseBonus.dodge + state.dodgeBonus + state.creatureSize.dodgeBonus));
    $toughness = npcStore.pipe(select(state => 10 + this.calculateCon(state) + this.getBaseStatArray(state).defenseBonus.toughness + state.toughnessBonus));
    $willpower = npcStore.pipe(select(state => 10 + this.calculateSpi(state) + this.getBaseStatArray(state).defenseBonus.willpower + state.willpowerBonus));
    $shieldBlock = npcStore.pipe(select(state =>  state.shieldBlock === 0 ? 0 : this.getBaseStatArray(state).levels.martialLevel + state.shieldBlock));
    $shieldThreshold = npcStore.pipe(select(state => state.shieldThreshold));

    $damageResistances = npcStore.pipe(select(state => this.flattenDamageResistances(state)));
    $damageImmunities = npcStore.pipe(select(state => [...state.creatureType.damageImmunities, ...state.additionalImmunities].join(', ')));
    $statusEffectImmunties = npcStore.pipe(select(state => [...state.creatureType.statusEffectImmunities, ...state.additionalStatusEffectImmunities].join(', ')));
    $damageVulnurabilities = npcStore.pipe(select(state => [...state.creatureType.damageVulnurabilities, ...state.additionalVulnurabilities].join(', ')));

    $traits = npcStore.pipe(select(state => state.freeCreatureTrait === undefined ? state.traits : [...state.traits, state.freeCreatureTrait]));

    $customAbilities = npcStore.pipe(select(state => state.customAbilities));
    $allAbilities = npcStore.pipe(select(state => [...state.preDefinedAbilities, ...state.customAbilities]
        .map(a => ({
            name: a.name,
            pointsCost: a.pointsCost,
            apCost: a.apCost,
            mpCost: a.mpCost,
            description: a.description
                .replaceAll('[MEELE RANGE]', state.creatureSize.meleeRange)
                .replaceAll('[MELEE MARTIAL ATTACK]', 'Attack ⚔️ ' + (10 + this.calculateAgi(state) + this.getBaseStatArray(state).levels.martialLevel))
                .replaceAll('[RANGED MARTIAL ATTACK]', 'Attack 🏹 ' + (10 + this.calculatePer(state) + this.getBaseStatArray(state).levels.martialLevel))
                .replaceAll('[MELEE SPELL ATTACK]', 'Attack ⚔️✨ ' + (10 + this.calculateAgi(state) + this.getBaseStatArray(state).levels.spellLevel))
                .replaceAll('[RANGED SPELL ATTACK]', 'Attack 🏹✨ ' + (10 + this.calculatePer(state) + this.getBaseStatArray(state).levels.spellLevel))
                .replaceAll('[LIGHT MARTIAL DAMAGE]', this.getLightDamage(this.calculateStr(state)))
                .replaceAll('[MEDIUM MARTIAL DAMAGE]', this.getMediumDamage(this.calculateStr(state)))
                .replaceAll('[HEAVY MARTIAL DAMAGE]', this.getHeavyDamage(this.calculateStr(state)))
                .replaceAll('[LIGHT SPELL DAMAGE]', this.getLightDamage(this.calculateSpi(state)))
                .replaceAll('[MEDIUM SPELL DAMAGE]', this.getMediumDamage(this.calculateSpi(state)))
                .replaceAll('[HEAVY SPELL DAMAGE]', this.getHeavyDamage(this.calculateSpi(state)))
                .replaceAll('[STR]', this.calculateStr(state).toString())
                .replaceAll('[AGI]', this.calculateAgi(state).toString())
                .replaceAll('[CON]', this.calculateCon(state).toString())
                .replaceAll('[INT]', this.calculateInt(state).toString())
                .replaceAll('[SPI]', this.calculateSpi(state).toString())
                .replaceAll('[PER]', this.calculatePer(state).toString())
                .replaceAll('[CHA]', this.calculateCha(state).toString())
                .replaceAll('[MARTIAL LEVEL]', this.getBaseStatArray(state).levels.martialLevel.toString())
                .replaceAll('[SPELL LEVEL]', this.getBaseStatArray(state).levels.spellLevel.toString())
                .replaceAll('[DEFAULT DURATION]', Math.max(2, Math.floor(state.levelConfig.level / 2)).toString())
        }))
    ));
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
        let freeTrait = traitsJson.creatureTypeSpecificTraits.find(t => t.name === type.freeTrait);
        npcStore.update(setProp('freeCreatureTrait', existingFreeTrait => {
            //if (existingFreeTrait) { this.removeTraitsCharacteristics(existingFreeTrait.name); }
            return freeTrait;
        }));
        //if (freeTrait) { this.applyTraitsCharacteristics(freeTrait.name); }

        npcStore.update(setProp('creatureType', type));
        this.updateCreatureSubType(type.availibleSubTypes[0]);
    }

    updateCreatureSubType(subType: CreatureSubType) {
        let freeTrait = traitsJson.creatureTypeSpecificTraits.find(t => t.name === subType.freeTrait);
        npcStore.update(setProp('freeSubCreatureTrait', existingFreeTrait => {
            //if (existingFreeTrait) { this.removeTraitsCharacteristics(existingFreeTrait.name); }
            return freeTrait;
        }));
        //if (freeTrait) { this.applyTraitsCharacteristics(freeTrait.name); }

        npcStore.update(setProp('creatureSubType', subType));
    }

    updateCreatureSize(size: CreatureSize) {
        npcStore.update(setProp('creatureSize', size));
    }

    updatePrimaryAttributeBoost(attr: Attributes) {
        npcStore.update(setProp('primaryAttributeBoost', attr));
    }

    updateSecondaryAttributeBoost(attr: Attributes) {
        npcStore.update(setProp('secondaryAttributeBoost', attr));
    }

    addTrait(trait: Trait) {
        this.applyTraitsCharacteristics(trait.name);
        npcStore.update(setProp('traits', traits => [...traits, trait]));
    }

    removeTrait(trait: Trait) {
        this.removeTraitsCharacteristics(trait.name);
        npcStore.update(setProp('traits', traits => traits.filter(t => t.name !== trait.name)));
    }

    addCustomAbility(ability: Ability) {
        npcStore.update(setProp('customAbilities', existingAbilities => [...existingAbilities, ability]));
    }

    removeCustomAbility(ability: Ability) {
        npcStore.update(setProp('customAbilities', existingAbilities => existingAbilities.filter(a => a.name !== ability.name)));
    }

    addPreDefinedAbility(ability: Ability) {
        npcStore.update(setProp('preDefinedAbilities', existingAbilities => [...existingAbilities, ability]));
    }

    removePreDefinedAbility(ability: Ability) {
        npcStore.update(setProp('preDefinedAbilities', existingAbilities => existingAbilities.filter(a => a.name !== ability.name)));
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
        return state.strBonus +
            this.getBaseStatArray(state).attributes.str +
            state.creatureType.attributeBonsuses.str +
            state.creatureSubType.attributeBonsuses.str +
            state.creatureSize.strBonus +
            (state.primaryAttributeBoost === Attributes.STR ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.STR ? 1 : 0);
    }

    private calculateAgi(state: NPC): number {
        return state.agiBonus +
            this.getBaseStatArray(state).attributes.agi +
            state.creatureType.attributeBonsuses.agi +
            state.creatureSubType.attributeBonsuses.agi +
            (state.primaryAttributeBoost === Attributes.AGI ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.AGI ? 1 : 0);
    }

    private calculateCon(state: NPC): number {
        return state.conBonus +
            this.getBaseStatArray(state).attributes.con +
            state.creatureType.attributeBonsuses.con +
            state.creatureSubType.attributeBonsuses.con +
            (state.primaryAttributeBoost === Attributes.CON ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.CON ? 1 : 0);
    }

    private calculateInt(state: NPC): number {
        return state.intBonus +
            this.getBaseStatArray(state).attributes.int +
            state.creatureType.attributeBonsuses.int +
            state.creatureSubType.attributeBonsuses.int +
            (state.primaryAttributeBoost === Attributes.INT ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.INT ? 1 : 0);
    }

    private calculateSpi(state: NPC): number {
        return state.spiBonus +
            this.getBaseStatArray(state).attributes.spi +
            state.creatureType.attributeBonsuses.spi +
            state.creatureSubType.attributeBonsuses.spi +
            (state.primaryAttributeBoost === Attributes.SPI ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.SPI ? 1 : 0);
    }

    private calculatePer(state: NPC): number {
        return state.perBonus + 
            this.getBaseStatArray(state).attributes.per +
            state.creatureType.attributeBonsuses.per +
            state.creatureSubType.attributeBonsuses.per +
            (state.primaryAttributeBoost === Attributes.PER ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.PER ? 1 : 0);
    }

    private calculateCha(state: NPC): number {
        return state.chaBonus +
            this.getBaseStatArray(state).attributes.cha +
            state.creatureType.attributeBonsuses.cha +
            state.creatureSubType.attributeBonsuses.cha +
            (state.primaryAttributeBoost === Attributes.CHA ? 2 : 0) +
            (state.secondaryAttributeBoost === Attributes.CHA ? 1 : 0);
    }

    private flattenDamageResistances(state: NPC): string {
        return [...state.creatureType.damageResistances, ...state.additionalResistances]
            .map(dmgR => dmgR.type + ' ' + dmgR.value)
            .map(str => str.replaceAll('[LEVEL]', Math.ceil(state.levelConfig.level).toString()))
            .map(str => str.replaceAll('[HALF LEVEL]', Math.floor(state.levelConfig.level / 2).toString()))
            .sort((s1, s2) => s1.localeCompare(s2))
            .join(', ');
    }

    private getLightDamage(str: number): string {
        return martialDamageJson.find(mdmg => mdmg.str === str)?.lightDamage ?? '';
    }
    private getMediumDamage(str: number): string {
        return martialDamageJson.find(mdmg => mdmg.str === str)?.mediumDamage ?? '';
    }
    private getHeavyDamage(str: number): string {
        return martialDamageJson.find(mdmg => mdmg.str === str)?.heavyDamage ?? '';
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
        npcStore.update(setProp('additionalResistances', dmg => dmg.filter(d => !(d.type === dmgResistance.type && d.value === dmgResistance.value))));
    }
    private addDamageImmunity(dmgImmunity: string) {
        npcStore.update(setProp('additionalImmunities', dmg => [...dmg, dmgImmunity]));
    }
    private removeDamageImmunity(dmgImmunity: string) {
        npcStore.update(setProp('additionalImmunities', dmg => dmg.filter(d => d !== dmgImmunity)));
    }
    private addStatusEffectImmunity(statusEffectImmunity: string) {
        npcStore.update(setProp('additionalStatusEffectImmunities', sei => [...sei, statusEffectImmunity]));
    }
    private removeStatusEffectImmunity(statusEffectImmunity: string) {
        npcStore.update(setProp('additionalStatusEffectImmunities', sei => sei.filter(s => s !== statusEffectImmunity)));
    }
    private updateHardnessBonus(bonus: number) {
        npcStore.update(setProp('hardnessBonus', hardnessBonus => hardnessBonus + bonus));
    }
    private updateDodgeBonus(bonus: number) {
        npcStore.update(setProp('dodgeBonus', dodgeBonus => dodgeBonus + bonus));
    }
    private updateToughnessBonus(bonus: number) {
        npcStore.update(setProp('toughnessBonus', toughnessBonus => toughnessBonus + bonus));
    }
    private updateWillpowerBonus(bonus: number) {
        npcStore.update(setProp('willpowerBonus', willpowerBonus => willpowerBonus + bonus));
    }
    private setShield(shieldBlock: number, shieldThreshold: number) {
        npcStore.update(setProp('shieldBlock', block => shieldBlock));
        npcStore.update(setProp('shieldThreshold', threshold => shieldThreshold));
    }
    private updateBaseHpBonus(hp: number) {
        npcStore.update(setProp('baseHpBonus', hpBonus => hpBonus + hp));
    }
    private updateSpiBonus(spi: number) {
        npcStore.update(setProp('spiBonus', spiBonus => spiBonus + spi));
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
                this.addSpecialMovement('fly(1.5m)');
                break;
            case 'Water Elemental':
                this.addSpecialMovement('swim(1.5m)');
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
                this.addSpecialMovement('fly(1.5m)');
                break;
            case 'Fly II':
                this.addSpecialMovement('fly(3m)');
                break;
            case 'Fly III':
                this.addSpecialMovement('fly(4.5m)');
                break;
            case 'Tank I':
                this.updateBaseHpBonus(5);
                this.updateHpPerLevelBonus(2);
                break;
            case 'Tank II':
                this.updateBaseHpBonus(10);
                this.updateHpPerLevelBonus(2);
                break;
            case 'Tank III':
                this.updateBaseHpBonus(20);
                this.updateHpPerLevelBonus(2);
                break;
            case 'Hardness I':
                this.updateHardnessBonus(2);
                break;
            case 'Hardness II':
                this.updateHardnessBonus(2);
                break;
            case 'Dodge I':
                this.updateDodgeBonus(1);
                break;
            case 'Dodge II':
                this.updateDodgeBonus(1);
                break;
            case 'Toughness I':
                this.updateToughnessBonus(2);
                break;
            case 'Toughness II':
                this.updateToughnessBonus(2);
                break;
            case 'Willpower I':
                this.updateWillpowerBonus(2);
                break;
            case 'Willpower II':
                this.updateWillpowerBonus(2);
                break;
            case 'Natural Armor':
                this.addDamageResistance({ type: 'physical', value: '2 + [LEVEL]'});
                break;
            case 'Damage Resistance I':
                this.addDamageResistance({ type: 'custom', value: '5 + [HALF LEVEL]'});
                break;
            case 'Damage Resistance II':
                this.addDamageResistance({ type: 'custom', value: '15 + [LEVEL]'});
                break;
            case 'Damage Immunity':
                this.addDamageImmunity('custom');
                break;
            case 'Status Effect Resistance':
                break;
            case 'Status Effect Immunity':
                this.addStatusEffectImmunity('custom');
                break;
            case 'Armor I':
                this.updateDodgeBonus(-1);
                this.addDamageResistance({ type: 'physical', value: '2'});
                break;
            case 'Armor II':
                this.updateDodgeBonus(-3);
                this.addDamageResistance({ type: 'physical', value: '4'});
                break;
            case 'Armor III':
                this.updateDodgeBonus(-5);
                this.updateMpBonus(-1);
                this.addDamageResistance({ type: 'physical', value: '6'});
                break;
            case 'Small Shield':
                this.setShield(12, 15);
                break;
            case 'Medium Shield':
                this.updateDodgeBonus(-1);
                this.setShield(14, 25);
                break;
            case 'Tower Shield':
                this.updateDodgeBonus(-3)
                this.updateMpBonus(-1);
                this.setShield(16, 40);
                break;
            case 'Nightvision I':
                break;
            case 'Nightvision II':
                break;
            case 'Nightvision III':
                break;
            case 'Cosmic Corrupted':
                this.updateSpiBonus(1);
                this.addDamageResistance({ type: 'cosmic', value: '5 + [HALF LEVEL]'});
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
                this.removeSpecialMovement('fly(1.5m)');
                break;
            case 'Water Elemental':
                this.removeSpecialMovement('swim(1.5m)');
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
                this.removeSpecialMovement('fly(1.5m)');
                break;
            case 'Fly II':
                this.removeSpecialMovement('fly(3m)');
                break;
            case 'Fly III':
                this.removeSpecialMovement('fly(4.5m)');
                break;
            case 'Tank I':
                this.updateBaseHpBonus(-5);
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Tank II':
                this.updateBaseHpBonus(-10);
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Tank III':
                this.updateBaseHpBonus(-20);
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Hardness I':
                this.updateHardnessBonus(-2);
                break;
            case 'Hardness II':
                this.updateHardnessBonus(-2);
                break;
            case 'Dodge I':
                this.updateDodgeBonus(-1);
                break;
            case 'Dodge II':
                this.updateDodgeBonus(-1);
                break;
            case 'Toughness I':
                this.updateToughnessBonus(-2);
                break;
            case 'Toughness II':
                this.updateToughnessBonus(-2);
                break;
            case 'Willpower I':
                this.updateWillpowerBonus(-2);
                break;
            case 'Willpower II':
                this.updateWillpowerBonus(-2);
                break;
            case 'Natural Armor':
                this.removeDamageResistance({ type: 'physical', value: '2 + [LEVEL]'});
                break;
            case 'Damage Resistance I':
                this.removeDamageResistance({ type: 'custom', value: '5 + [HALF LEVEL]'});
                break;
            case 'Damage Resistance II':
                this.removeDamageResistance({ type: 'custom', value: '15 + [LEVEL]'});
                break;
            case 'Damage Immunity':
                this.removeDamageImmunity('custom');
                break;
            case 'Status Effect Resistance':
                break;
            case 'Status Effect Immunity':
                this.removeStatusEffectImmunity('custom');
                break;
            case 'Armor I':
                this.updateDodgeBonus(1);
                this.removeDamageResistance({ type: 'physical', value: '2'});
                break;
            case 'Armor II':
                this.updateDodgeBonus(3);
                this.removeDamageResistance({ type: 'physical', value: '4'});
                break;
            case 'Armor III':
                this.updateDodgeBonus(5);
                this.updateMpBonus(1);
                this.removeDamageResistance({ type: 'physical', value: '6'});
                break;
            case 'Small Shield':
                this.setShield(0, 0);
                break;
            case 'Medium Shield':
                this.updateDodgeBonus(1);
                this.setShield(0, 0);
                break;
            case 'Tower Shield':
                this.updateDodgeBonus(3);
                this.updateMpBonus(1);
                this.setShield(0, 0);
                break;
            case 'Nightvision I':
                break;
            case 'Nightvision II':
                break;
            case 'Nightvision III':
                break;
            case 'Cosmic Corrupted':
                this.updateSpiBonus(-1);
                this.removeDamageResistance({ type: 'cosmic', value: '5 + [HALF LEVEL]'});
                break;
            default:
                console.error('Unkown trait ' + traitName + ' unable to apply characteristics');
        }
    }
}