import { Component, Input } from '@angular/core';
import { CreatureSize } from '../../../util/model/creatureSize';

@Component({
    selector: 'app-creature-size-info',
    imports: [],
    templateUrl: './creature-size-info.component.html',
    styleUrl: './creature-size-info.component.scss'
})
export class CreatureSizeInfoComponent {

  @Input() creatureSize?: CreatureSize
}
