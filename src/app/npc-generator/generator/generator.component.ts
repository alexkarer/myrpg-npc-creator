import {  Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../util/alignment';
import { NPC, createEmptyNPC } from '../../util/npcs';
import { levelConfigs } from '../../util/levels';
import { AttributeModifiers, creatureTypes } from '../../util/creatureTypes';
import { creatureSizes } from '../../util/creatureSize';
import { CommonModule } from '@angular/common';
import { CreatureSizeInfoComponent } from './creature-size-info/creature-size-info.component';
import { CreatureTypeInfoComponent } from './creature-type-info/creature-type-info.component';
import { BaseStatArray, BaseStatArrays, fighterBaseStatArrays } from '../../util/baseStatArray';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, CreatureSizeInfoComponent, CreatureTypeInfoComponent],
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

  selectedBaseStatArray: BaseStatArrays = BaseStatArrays.FIGHTER;
  baseStatArrays = Object.values(BaseStatArrays);

  constructor() {
    this.applyBaseStatArray(fighterBaseStatArrays.find(a => a.level === this.npc.level));
    this.generatedNPC.emit(this.npc);
  }

  private emitNPCUpdate(): void {
    this.calculateHP();
    this.generatedNPC.emit(this.npc);
  }

  private calculateHP(): void {
    this.npc.hp = Math.floor((this.npc.creatureSize.hpPerLevel + this.npc.con) * this.npc.level);
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
      const oldLevel = this.npc.level;

      this.availibleNpCCreationPoints = levelConfig.points;
      this.npc.level = levelConfig.level;
      this.npc.xp = levelConfig.XP;
      this.npc.ap = levelConfig.AP;

      this.handleBaseStatArrayUpdate(this.selectedBaseStatArray, oldLevel);
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

  handleBaseStatArrayUpdate(selectedArray: BaseStatArrays, oldLevel: number): void {
    switch(this.selectedBaseStatArray) {
      case BaseStatArrays.FIGHTER:
        this.removeBaseStatArray(fighterBaseStatArrays.find(a => a.level === oldLevel));
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
        this.applyBaseStatArray(fighterBaseStatArrays.find(a => a.level === this.npc.level));
        this.selectedBaseStatArray = selectedArray;
        break;
      case BaseStatArrays.SPELLCASTER: 
        this.selectedBaseStatArray = selectedArray; 
        break;
      case BaseStatArrays.SPECIALIST: 
        this.selectedBaseStatArray = selectedArray;
        break;
      case BaseStatArrays.HYBRID: 
        this.selectedBaseStatArray = selectedArray; 
        break;
    }
    this.emitNPCUpdate();
  }

  private removeBaseStatArray(baseStatArray?: BaseStatArray): void {
    if (!baseStatArray) {
      return;
    }
    this.applyAttributeModifiers(baseStatArray.attributeModifiers, false);
  }

  private applyBaseStatArray(baseStatArray?: BaseStatArray): void {
    if (!baseStatArray) {
      return;
    }
    this.applyAttributeModifiers(baseStatArray.attributeModifiers);
    this.npc.martialLevel = baseStatArray.martialLevel;
    this.npc.spellLevel = baseStatArray.spellcastingLevel;
  }
}
