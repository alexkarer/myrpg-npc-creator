import {  Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../npc/alignments';
import { NPC, createEmptyNPC } from '../../npc/npc';
import { CommonModule } from '@angular/common';
import levelJson from '../../../resources/levels.json';
import archeTypesJson from '../../../resources/archetypes.json'; 

@Component({
    selector: 'app-generator',
    imports: [NgbDropdownModule, CommonModule],
    templateUrl: './generator.component.html',
    styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

  @Output() generatedNPC = new EventEmitter<NPC>;
  npc = createEmptyNPC();

  selectedArcheType = ArcheTypes.WARRIOR;
  availibleNpCCreationPoints = 1;
  usedNpCCreationPoints = 0;

  readonly archTypes = Object.values(ArcheTypes);
  readonly alignments = alignments;
  readonly levelNumbers = levelJson.map(lvl => lvl.level);

  constructor() {
    this.updateArcheTypeBaseStatArray(this.selectedArcheType);
    this.generatedNPC.emit(this.npc);
  }

  npcCreationPointsExceeded(): boolean {
    return this.usedNpCCreationPoints > this.availibleNpCCreationPoints;
  }

  handleNameUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.npc.name = target.value;
    this.generatedNPC.emit(this.npc);
  }

  handleAlignmentUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.npc.alignment = target.value as Alignment;
    this.generatedNPC.emit(this.npc);
  }

  handleLevelUpdate(levelNumber: number): void {
    let levelConfig = levelJson.find(lvlConfig => lvlConfig.level === levelNumber);
    if (levelConfig) {
      this.npc.levelConfig = levelConfig;
      this.reCalculateHP();
      this.generatedNPC.emit(this.npc);
    }
  }

  handleArcheTypeUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let archeType = target.value as ArcheTypes;
    this.updateArcheTypeBaseStatArray(archeType);
    this.generatedNPC.emit(this.npc);
  }

  private updateArcheTypeBaseStatArray(archeType: ArcheTypes): void {
    // TODO: properly update everything and remove old update
    switch(archeType) {
      case ArcheTypes.WARRIOR:
        this.selectedArcheType = archeType;
        let warrior = archeTypesJson.warriorBaseStatArray.find(bsa => bsa.levels.level === this.npc.levelConfig.level);
        if (warrior) {
          this.npc.baseStatArray = warrior;
        }
        break;
      case ArcheTypes.SPELLCASTER:
        this.selectedArcheType = archeType;
        let spellCaster = archeTypesJson.spellCasterBaseStatArray.find(bsa => bsa.levels.level === this.npc.levelConfig.level);
        if (spellCaster) {
          this.npc.baseStatArray = spellCaster;
        }
        break;
      case ArcheTypes.EXPERT:
        this.selectedArcheType = archeType;
        let expert = archeTypesJson.expertBaseStatArray.find(bsa => bsa.levels.level === this.npc.levelConfig.level);
        if (expert) {
          this.npc.baseStatArray = expert;
        }
        break;
      default:
        console.error('Illegal ArcheType: ' + archeType);
    }
    this.reCalculateHP();
  }

  private reCalculateHP(): void {
    this.npc.hp = this.npc.baseStatArray.hpBonus + Math.floor((this.npc.creatureSize.hpPerLevel + Math.floor(this.npc.con / 2)) * this.npc.levelConfig.level);
  }

}

enum ArcheTypes {
  WARRIOR = 'Warrior',
  SPELLCASTER = 'Spellcaster',
  EXPERT = 'Expert'
}
