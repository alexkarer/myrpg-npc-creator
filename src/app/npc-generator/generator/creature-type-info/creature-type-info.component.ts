import { Component, Input } from '@angular/core';
import { CreatureType } from '../../../util/model/creatureTypes';
import { toStringAttributeModifiers } from '../../../util/stringUtils';

@Component({
    selector: 'app-creature-type-info',
    imports: [],
    templateUrl: './creature-type-info.component.html',
    styleUrl: './creature-type-info.component.scss'
})
export class CreatureTypeInfoComponent {

  @Input() creatureType?: CreatureType

  attributeModifiers(): string {
    if (this.creatureType?.attributeModifiers) {
      return toStringAttributeModifiers(this.creatureType.attributeModifiers, false);
    }
    return '';
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
