import {  Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../util/model/alignment';
import { NPC, createEmptyNPC } from '../../util/model/npc';
import { levelConfigs } from '../../util/model/levels';
import { creatureTypes } from '../../util/model/creatureTypes';
import { creatureSizes } from '../../util/model/creatureSize';
import { CommonModule } from '@angular/common';
import { CreatureSizeInfoComponent } from './creature-size-info/creature-size-info.component';
import { CreatureTypeInfoComponent } from './creature-type-info/creature-type-info.component';
import { BaseStatArray, BaseStatArrays, fighterBaseStatArrays } from '../../util/model/baseStatArray';
import { BaseStatArrayInfoComponent } from './base-stat-array-info/base-stat-array-info.component';
import { AttributeModifiers } from '../../util/model/AttributeModifiers';
import { removeElements } from '../../util/listUtils';
import { defensiveTraits, getAllTraits, movementTraits, wargearTraits } from '../../util/model/trait';

@Component({
    selector: 'app-generator',
    imports: [NgbDropdownModule, CommonModule, CreatureSizeInfoComponent, CreatureTypeInfoComponent, BaseStatArrayInfoComponent],
    templateUrl: './generator.component.html',
    styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

  @Output() generatedNPC = new EventEmitter<NPC>;
  npc = createEmptyNPC();

  availibleNpCCreationPoints = 1;
  usedNpCCreationPoints = 0;

  readonly alignments = alignments;
  readonly levelConfigs = levelConfigs;
  readonly creatureTypes = creatureTypes;
  readonly creatureSizes = creatureSizes;
  
  readonly movementTraits = movementTraits;
  readonly defensiveTraits = defensiveTraits;
  readonly wargearTraits = wargearTraits;

  baseStatArrays = Object.values(BaseStatArrays);
  currentBaseStatArray?: BaseStatArray = fighterBaseStatArrays.at(0);

  constructor() {
    this.generatedNPC.emit(this.npc);
  }

  private emitNPCUpdate(): void {
    this.calculateHP();
    this.generatedNPC.emit(this.npc);
  }

  private calculateHP(): void {
    this.npc.hp = this.npc.creatureType.baseHP + Math.floor((this.npc.creatureSize.hpPerLevel + this.npc.con) * this.npc.level);
  }

  npcCreationPointsExceeded(): boolean {
    return this.usedNpCCreationPoints > this.availibleNpCCreationPoints;
  }

  handleNameUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.npc.name = target.value;
    this.emitNPCUpdate();
  }

  handleAlignmentUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.npc.alignment = target.value as Alignment;
    this.emitNPCUpdate();
  }

  handleLevelUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let levelConfig = levelConfigs.find(lvlConfig => lvlConfig.level === parseFloat(target.value));
    if (levelConfig) {
      this.availibleNpCCreationPoints = levelConfig.points;
      this.npc.level = levelConfig.level;
      this.npc.xp = levelConfig.XP;
      this.npc.ap = levelConfig.AP;

      this.handleBaseStatArrayUpdate(this.npc.baseStatArray);
      this.emitNPCUpdate();
    }
  }

  handleCreatureTypeUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let creatureType = creatureTypes.find(creatureType => creatureType.name === target.value);
    if (creatureType) {
      let previousCreatureType = this.npc.creatureType;

      this.usedNpCCreationPoints -= previousCreatureType.npcCreationPointsCost;
      this.usedNpCCreationPoints += creatureType.npcCreationPointsCost;

      this.applyAttributeModifiers(previousCreatureType.attributeModifiers, false);
      this.applyAttributeModifiers(creatureType.attributeModifiers);

      removeElements(this.npc.conditionImmunies, previousCreatureType.conditionImmunities);
      this.npc.conditionImmunies.push(...creatureType.conditionImmunities);
      removeElements(this.npc.resistances, previousCreatureType.damageResistances);
      this.npc.resistances.push(...creatureType.damageResistances);
      removeElements(this.npc.immunities, previousCreatureType.damageImmunities);
      this.npc.immunities.push(...creatureType.damageImmunities);
      removeElements(this.npc.vulnurabilities, previousCreatureType.damageVulnurabilities);
      this.npc.vulnurabilities.push(...creatureType.damageVulnurabilities);
      
      this.npc.creatureType = creatureType;
      this.emitNPCUpdate();
    }
  }

  private applyAttributeModifiers(attributeModifiers: AttributeModifiers, add: boolean = true): void {
    add ? this.npc.str += attributeModifiers.str : this.npc.str -= attributeModifiers.str;
    add ? this.npc.agi += attributeModifiers.agi : this.npc.agi -= attributeModifiers.agi;
    add ? this.npc.con += attributeModifiers.con : this.npc.con -= attributeModifiers.con;
    add ? this.npc.int += attributeModifiers.int : this.npc.int -= attributeModifiers.int;
    add ? this.npc.spi += attributeModifiers.spi : this.npc.spi -= attributeModifiers.spi;
    add ? this.npc.per += attributeModifiers.per : this.npc.per -= attributeModifiers.per;
    add ? this.npc.cha += attributeModifiers.cha : this.npc.cha -= attributeModifiers.cha;
  }

  handleCreatureSizeUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let creatureSize = creatureSizes.find(creatureSize => creatureSize.name === target.value);
    if (creatureSize) {
      let previousCreatureSize = this.npc.creatureSize;

      this.usedNpCCreationPoints -= previousCreatureSize.npcCreationPointsCost;
      this.usedNpCCreationPoints += creatureSize.npcCreationPointsCost;
      this.npc.str -= previousCreatureSize.strBonus;
      this.npc.str += previousCreatureSize.strBonus;

      this.npc.creatureSize = creatureSize;
      this.emitNPCUpdate();
    }
  }

  handleBaseStatArrayUpdate(selectedArray: BaseStatArrays): void {
    switch(this.npc.baseStatArray) {
      case BaseStatArrays.FIGHTER:
        this.removeBaseStatArray(this.currentBaseStatArray);
        break;
      case BaseStatArrays.SPELLCASTER: 
        break;
      case BaseStatArrays.SPECIALIST: 
        break;
      case BaseStatArrays.HYBRID: 
        break;
    }

    switch(selectedArray) {
      case BaseStatArrays.FIGHTER:
        const bsa = fighterBaseStatArrays.find(a => a.level === this.npc.level);
        this.applyBaseStatArray(bsa);
        this.currentBaseStatArray = bsa;
        this.npc.baseStatArray = selectedArray;
        break;
      case BaseStatArrays.SPELLCASTER: 
        this.npc.baseStatArray = selectedArray; 
        break;
      case BaseStatArrays.SPECIALIST: 
        this.npc.baseStatArray = selectedArray;
        break;
      case BaseStatArrays.HYBRID: 
        this.npc.baseStatArray = selectedArray; 
        break;
    }
    this.emitNPCUpdate();
  }

  private removeBaseStatArray(baseStatArray?: BaseStatArray): void {
    if (!baseStatArray) {
      return;
    }
    this.applyAttributeModifiers(baseStatArray.attributeModifiers, false);
    this.npc.hardnessBonus -=  baseStatArray.hardness;
    this.npc.dodgeBonus -= baseStatArray.dodge;
    this.npc.toughnessBonus -= baseStatArray.toughness;
    this.npc.willpowerBonus -= baseStatArray.willpower
  }

  private applyBaseStatArray(baseStatArray?: BaseStatArray): void {
    if (!baseStatArray) {
      return;
    }
    this.applyAttributeModifiers(baseStatArray.attributeModifiers);
    this.npc.martialLevel = baseStatArray.martialLevel;
    this.npc.spellLevel = baseStatArray.spellcastingLevel;

    this.npc.hardnessBonus +=  baseStatArray.hardness;
    this.npc.dodgeBonus += baseStatArray.dodge;
    this.npc.toughnessBonus += baseStatArray.toughness;
    this.npc.willpowerBonus += baseStatArray.willpower;
  }

  handleTraitSelection(event: Event): void {
    let target = event.target as HTMLInputElement;
    let traitToRemoveIndex = this.npc.traits.findIndex(t => t.title === target.value);
    let trait = getAllTraits().find(t => t.title === target.value);

    if (traitToRemoveIndex !== -1) {
      let trait = this.npc.traits.at(traitToRemoveIndex);
      if (trait) {
        this.usedNpCCreationPoints -= trait.npcPointsCost;
      } 
      this.npc.traits.splice(traitToRemoveIndex, 1);
    } else if (trait) {
      this.usedNpCCreationPoints += trait.npcPointsCost;
      this.npc.traits.push(trait);
    }
  }

  isTraitActive(traitName: string) {
    return this.npc.traits.findIndex(t => t.title === traitName) !== -1;
  }
}
