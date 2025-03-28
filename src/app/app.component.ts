import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreviewComponent } from './npc-preview/preview.component';
import { GeneratorComponent } from "./npc-generator/generator/generator.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PreviewComponent, GeneratorComponent]
})
export class AppComponent {
  title = 'myrpg-npc-creator';
}
