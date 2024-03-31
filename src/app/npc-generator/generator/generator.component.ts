import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Alignment } from '../../util/alignment';
import { NPC, createEmptyNPC } from '../../npc-preview/npcs';

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

  alignments: Alignment[] = [
    Alignment.None, 
    Alignment.LawfulGood, 
    Alignment.LawfulNeutral, 
    Alignment.LawfulEvil, 
    Alignment.NeutralGood, 
    Alignment.Neutral, 
    Alignment.NeutralEvil, 
    Alignment.ChaoticGood,
    Alignment.ChaoticNeutral,
    Alignment.ChaoticEvil
  ]

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

}
