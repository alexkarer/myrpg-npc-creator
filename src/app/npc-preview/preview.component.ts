import { Component, Input } from '@angular/core';
import { NPC } from '../npc/npc';
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
}
