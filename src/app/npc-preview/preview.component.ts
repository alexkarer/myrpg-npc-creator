import { Component, Input } from '@angular/core';
import { NPC } from './npcs';

@Component({
  selector: 'app-preview',
  standalone: true,
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  @Input() public npc?: NPC
}
