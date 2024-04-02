import {  Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../util/alignment';
import { NPC, createEmptyNPC } from '../../util/npcs';
import { LevelConfig, levelConfigs } from '../../util/levels';

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

}
