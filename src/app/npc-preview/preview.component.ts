import { Component, Input } from '@angular/core';
import { NPC } from '../util/npcs';

@Component({
  selector: 'app-preview',
  standalone: true,
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
}
