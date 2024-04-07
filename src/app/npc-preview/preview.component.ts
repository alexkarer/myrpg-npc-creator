import { Component, Input } from '@angular/core';
import { NPC } from '../util/model/npc';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  standalone: true,
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
      return this.npc.hardnessBonus + this.npc.str;
    }
    return 0;
  }

  get dodge(): number {
    if (this.npc) {
      return this.npc.dodgeBonus + this.npc.agi;
    }
    return 0;
  }

  get toughness(): number {
    if (this.npc) {
      return this.npc.toughnessBonus + this.npc.con;
    }
    return 0;
  }

  get willpower(): number {
    if (this.npc) {
      return this.npc.willpowerBonus + this.npc.spi;
    }
    return 0;
  }
}
