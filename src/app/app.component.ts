import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreviewComponent } from './npc-preview/preview.component';
import { NPC, createEmptyNPC } from './util/model/npc';
import { GeneratorComponent } from "./npc-generator/generator/generator.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PreviewComponent, GeneratorComponent]
})
export class AppComponent {
  title = 'myrpg-npc-creator';

  public previewNPC: NPC

  constructor() {
    this.previewNPC = createEmptyNPC();
  }

  handleGeneratedNPCChange(npc: NPC): void {
    this.previewNPC = npc;
  }
}
