import { Component, Input } from '@angular/core';
import { Ability, NPC } from '../npc/npc';
import { CommonModule } from '@angular/common';
import { NpcRepository } from '../npc/npc.repository';

@Component({
    selector: 'app-preview',
    imports: [CommonModule],
    templateUrl: './preview.component.html',
    styleUrl: './preview.component.scss'
})
export class PreviewComponent {

  constructor(public npcRepo: NpcRepository) {}

  getAbilityCost(ability: Ability): string {
     if (ability.apCost !== 0 && ability.mpCost === 0) {
      return ability.apCost + ' [AP]';
    } else if (ability.apCost === 0 && ability.mpCost !== 0) {
      return ability.mpCost + ' [MP]';
    } else if (ability.apCost !== 0 && ability.mpCost !== 0) {
      return ability.apCost + ' [AP] ' + ability.mpCost + ' [MP]';
    }
    return '-';
  }
}
