import { Component, Input } from '@angular/core';
import { NPC } from '../npc/npc';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-preview',
    imports: [CommonModule],
    templateUrl: './preview.component.html',
    styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  @Input() public npc?: NPC

  flattenNpcSpecialMove(): string {
    if (this.npc) {
      return this.npc?.specialMovement.join(', ');
    }
    return '';
  }

  get hardness(): number {
    if (this.npc) {
      return 10 + this.npc.hardnessBonus + this.npc.str;
    }
    return 0;
  }

  get dodge(): number {
    if (this.npc) {
      return 10 + this.npc.dodgeBonus + this.npc.agi;
    }
    return 0;
  }

  get toughness(): number {
    if (this.npc) {
      return 10 + this.npc.toughnessBonus + this.npc.con;
    }
    return 0;
  }

  get willpower(): number {
    if (this.npc) {
      return 10 + this.npc.willpowerBonus + this.npc.spi;
    }
    return 0;
  }

  get meleeMartialAttack(): number {
    if (this.npc) {
      return 10 + this.npc.martialLevel + this.npc.agi;
    }
    return 0;
  }

  get rangedMartialAttack(): number {
    if (this.npc) {
      return 10 + this.npc.martialLevel + this.npc.per;
    }
    return 0;
  }
  
  get meleeSpellAttack(): number {
    if (this.npc) {
      return 10 + this.npc.spellLevel + this.npc.agi;
    }
    return 0;
  }

  get rangedSpellAttack(): number {
    if (this.npc) {
      return 10 + this.npc.spellLevel + this.npc.per;
    }
    return 0;
  }
}
