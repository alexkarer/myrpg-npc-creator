import {  Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../util/alignment';
import { NPC, createEmptyNPC } from '../../util/npcs';
import { LevelConfig, levelConfigs } from '../../util/levels';
import { AttributeModifiers, CreatureType, creatureTypes } from '../../util/creatureTypes';
import { creatureSizes } from '../../util/creatureSize';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [NgbDropdownModule],
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

  constructor() {
    this.generatedNPC.emit(this.npc);
  }

  private emitNPCUpdate() {
    this.generatedNPC.emit(this.npc);
  }

  handleNameUpdate(event: Event) {
    let target = event.target as HTMLInputElement;
    this.npc.name = target.value;
    this.emitNPCUpdate();
  }

  handleAlignmentUpdate(event: Event) {
    let target = event.target as HTMLInputElement;
    this.npc.alignment = target.value as Alignment;
    this.emitNPCUpdate();
  }

  handleLevelUpdate(event: Event) {
    let target = event.target as HTMLInputElement;
    let levelConfig = levelConfigs.find(lvlConfig => lvlConfig.level === parseFloat(target.value));
    if (levelConfig) {
      this.availibleNpCCreationPoints = levelConfig.points;
      this.npc.level = levelConfig.level;
      this.npc.xp = levelConfig.XP;
      this.npc.ap = levelConfig.AP;
      this.emitNPCUpdate();
    }
  }

  handleCreatureTypeUpdate(event: Event) {
    let target = event.target as HTMLInputElement;
    let creatureType = creatureTypes.find(creatureType => creatureType.name === target.value);
    if (creatureType) {
      let previousCreatureType = this.npc.creatureType;

      this.usedNpCCreationPoints -= previousCreatureType.npcCreationPointsCost;
      this.usedNpCCreationPoints += creatureType.npcCreationPointsCost;
      this.applyModifiers(previousCreatureType.attributeModifiers, false);
      this.applyModifiers(creatureType.attributeModifiers);
      
      this.npc.creatureType = creatureType;
      this.emitNPCUpdate();
    }
  }

  private applyModifiers(attributeModifiers: AttributeModifiers, add: boolean = true) {
    add ? this.npc.str += attributeModifiers.str : this.npc.str -= attributeModifiers.str;
    add ? this.npc.agi += attributeModifiers.agi : this.npc.agi -= attributeModifiers.agi;
    add ? this.npc.con += attributeModifiers.con : this.npc.con -= attributeModifiers.con;
    add ? this.npc.int += attributeModifiers.int : this.npc.int -= attributeModifiers.int;
    add ? this.npc.spi += attributeModifiers.spi : this.npc.spi -= attributeModifiers.spi;
    add ? this.npc.per += attributeModifiers.per : this.npc.per -= attributeModifiers.per;
    add ? this.npc.cha += attributeModifiers.cha : this.npc.cha -= attributeModifiers.cha;
  }

  handleCreatureSizeUpdate(event: Event) {
    let target = event.target as HTMLInputElement;
    let creatureSize = creatureSizes.find(creatureSize => creatureSize.name === target.value);
    if (creatureSize) {
      let previousCreatureSize = this.npc.creatureSize;

      this.npc.str -= previousCreatureSize.strBonus;
      this.npc.str += previousCreatureSize.strBonus;

      this.npc.creatureSize = creatureSize;
      this.emitNPCUpdate();
    }
  }

}
