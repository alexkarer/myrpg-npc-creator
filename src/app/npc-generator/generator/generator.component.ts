import {  Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment, alignments } from '../../npc/alignments';
import { Ability, ArcheTypes, Attributes, Reaction, Trait } from '../../npc/npc';
import { CommonModule } from '@angular/common';
import { NpcRepository } from '../../npc/npc.repository';
import { combineLatest, map, Observable } from 'rxjs';
import { CustomAbilityComponent } from "../custom-ability/custom-ability.component"; 

import levelJson from '../../../resources/levels.json';
import archeTypesJson from '../../../resources/archetypes.json'; 
import creatureTypesJson from '../../../resources/creature_types.json'; 
import creatureSizesJson from '../../../resources/sizes.json'; 
import traitsJson from '../../../resources/traits.json'; 
import abilitiesJson from '../../../resources/abilities.json';

@Component({
    selector: 'app-generator',
    imports: [NgbDropdownModule, CommonModule, CustomAbilityComponent],
    templateUrl: './generator.component.html',
    styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

  readonly archTypes = Object.values(ArcheTypes);
  readonly alignments = alignments;
  readonly levelNumbers = levelJson.map(lvl => lvl.level);
  readonly creatureTypes = creatureTypesJson;
  readonly creatureSizes = creatureSizesJson;
  readonly attributes = Object.values(Attributes);
  readonly traits = traitsJson;
  readonly abilities = abilitiesJson;

  selectedArcheType = ArcheTypes.WARRIOR;
  currentCustomAbility!: Ability;

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

  handleTraitCheckBoxUpdate(event: Event, trait: Trait): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.npcRepo.addTrait(trait);
    } else {
      this.npcRepo.removeTrait(trait);
    }
  }

  handleAbilityCheckBoxUpdate(event: Event, ability: Ability): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.npcRepo.addPreDefinedAbility(ability);
    } else {
      this.npcRepo.removePreDefinedAbility(ability);
    }
  }

  handleReactionCheckBoxUpdate(event: Event, reaction: Reaction): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.npcRepo.addReaction(reaction);
    } else {
      this.npcRepo.removeReaction(reaction);
    }
  }

  handleCustomAbilityCreation(): void {
    if (this.currentCustomAbility) {
      this.npcRepo.addCustomAbility(this.currentCustomAbility);
    }
  }
}