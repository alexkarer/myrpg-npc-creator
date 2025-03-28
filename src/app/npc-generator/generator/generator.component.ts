import {  Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../npc/alignments';
import { ArcheTypes } from '../../npc/npc';
import { CommonModule } from '@angular/common';
import { NpcRepository } from '../../npc/npc.repository';
import { combineLatest, map, Observable } from 'rxjs';
import levelJson from '../../../resources/levels.json';
import archeTypesJson from '../../../resources/archetypes.json'; 
import creatureTypesJson from '../../../resources/creature_types.json'; 
import creatureSizesJson from '../../../resources/sizes.json'; 

@Component({
    selector: 'app-generator',
    imports: [NgbDropdownModule, CommonModule],
    templateUrl: './generator.component.html',
    styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

  readonly archTypes = Object.values(ArcheTypes);
  readonly alignments = alignments;
  readonly levelNumbers = levelJson.map(lvl => lvl.level);
  readonly creatureTypes = creatureTypesJson;
  readonly creatureSizes = creatureSizesJson;

  selectedArcheType = ArcheTypes.WARRIOR;

  constructor(public npcRepo: NpcRepository) {}

  npcCreationPointsExceeded(): Observable<boolean> {
    return combineLatest({availiblePoints: this.npcRepo.$availibleNpcCreationPoints, usedPoints: this.npcRepo.$usedNpcCreationPoints})
        .pipe(map(points => (points.availiblePoints - points.usedPoints) < 0));
  }

  handleNameUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.npcRepo.updateName(target.value);
  }

  handleAlignmentUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let alignment = target.value as Alignment;
    this.npcRepo.updateAlignment(alignment);
  }

  handleLevelUpdate(levelNumber: number): void {
    let levelConfig = levelJson.find(lvlConfig => lvlConfig.level === levelNumber);
    if (levelConfig) {
      this.npcRepo.updateLevel(levelConfig);
    } else {
      console.error('Level ' + levelNumber + ' not found in level configs!');
    }
  }

  handleArcheTypeUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let archeType = target.value as ArcheTypes;
    this.selectedArcheType = archeType;
    switch(archeType) {
      case ArcheTypes.WARRIOR:
        this.npcRepo.updateBaseStatArray(archeTypesJson.warriorBaseStatArray);
        break;
      case ArcheTypes.SPELLCASTER:
        this.npcRepo.updateBaseStatArray(archeTypesJson.spellCasterBaseStatArray);
        break;
      case ArcheTypes.EXPERT:
        this.npcRepo.updateBaseStatArray(archeTypesJson.expertBaseStatArray);
        break;
      default:
        console.error('ArcheType ' + archeType + ' not recognized!');
    }
  }

}