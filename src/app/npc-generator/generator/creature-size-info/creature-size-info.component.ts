import { Component, Input } from '@angular/core';
import { CreatureSize } from '../../../util/creatureSize';

@Component({
  selector: 'app-creature-size-info',
  standalone: true,
  imports: [],
  templateUrl: './creature-size-info.component.html',
  styleUrl: './creature-size-info.component.scss'
})
export class CreatureSizeInfoComponent {

  @Input() creatureSize?: CreatureSize
}
