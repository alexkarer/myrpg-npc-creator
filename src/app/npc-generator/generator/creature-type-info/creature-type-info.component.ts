import { Component, Input } from '@angular/core';
import { CreatureType, AttributeModifiers } from '../../../util/creatureTypes';

@Component({
  selector: 'app-creature-type-info',
  standalone: true,
  imports: [],
  templateUrl: './creature-type-info.component.html',
  styleUrl: './creature-type-info.component.scss'
})
export class CreatureTypeInfoComponent {

  @Input() creatureType?: CreatureType

  attributeModifiers(): string {
    let attributeString = (this.creatureType?.attributeModifiers.str !== 0 ? 'STR: ' + this.creatureType?.attributeModifiers.str + ', ' : '') +
      (this.creatureType?.attributeModifiers.agi !== 0 ? 'AGI: ' + this.creatureType?.attributeModifiers.agi + ', ' : '') +
      (this.creatureType?.attributeModifiers.con !== 0 ? 'CON: ' + this.creatureType?.attributeModifiers.con + ', ' : '') +
      (this.creatureType?.attributeModifiers.int !== 0 ? 'INT: ' + this.creatureType?.attributeModifiers.int + ', ' : '') +
      (this.creatureType?.attributeModifiers.spi !== 0 ? 'SPI: ' + this.creatureType?.attributeModifiers.spi + ', ' : '') +
      (this.creatureType?.attributeModifiers.per !== 0 ? 'PER: ' + this.creatureType?.attributeModifiers.per + ', ' : '') +
      (this.creatureType?.attributeModifiers.cha !== 0 ? 'CHA: ' + this.creatureType?.attributeModifiers.cha + ', ' : '');

    return attributeString.substring(0, attributeString.length - 2);
  }

  damageResistances(): string {
    if (this.creatureType?.damageResistances) {
      return this.creatureType.damageResistances.join(', ');
    }
    return '';
  }

  damageVulnurabilities(): string {
    if (this.creatureType?.damageVulnurabilities) {
      return this.creatureType.damageVulnurabilities.join(', ');
    }
    return '';
  }

  damageImmunities(): string {
    if (this.creatureType?.damageImmunities) {
      return this.creatureType.damageImmunities.join(', ');
    }
    return '';
  }

  conditionImmunities(): string {
    if (this.creatureType?.conditionImmunities) {
      return this.creatureType.conditionImmunities.join(', ');
    }
    return '';
  }

  
}
