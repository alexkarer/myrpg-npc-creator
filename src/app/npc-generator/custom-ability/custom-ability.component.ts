import { Component, output } from '@angular/core';
import { Ability } from '../../npc/npc';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import customAbilitiesJson from '../../../resources/custom_abilities.json';

@Component({
  selector: 'app-custom-ability',
  imports: [NgbDropdownModule],
  templateUrl: './custom-ability.component.html',
  styleUrl: './custom-ability.component.scss'
})
export class CustomAbilityComponent {
  abilityChange = output<Ability>();
  customAbilityOptions = customAbilitiesJson;

  abilityType: string = customAbilitiesJson.abilityTypes[0];
  name: string = 'Custom Ability';
  usageCost = customAbilitiesJson.abilityUsageCosts[1];
  usageRestriction = customAbilitiesJson.abilityUsageRestriction[0];
  targets = customAbilitiesJson.targets[0];
  mainEffect = customAbilitiesJson.mainEffects[1];
  sideEffects: (typeof customAbilitiesJson.sideEffects[0])[] = [];

  calculatePointsCost(): number {
    return this.usageCost.pointCost +
      this.usageRestriction.pointCost +
      this.targets.pointCost +
      this.mainEffect.pointCost +
      this.sideEffects.map(e => e.pointCost).reduce(((e1, e2) => e1 + e2), 0)
  }

  handleNameUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.name = target.value;
    this.triggerUpdate();
  }

  handleTypeUpdate(type: string): void {
    this.abilityType = type;
    this.triggerUpdate();
  }

  handleUsageCostUpdate(cost: typeof customAbilitiesJson.abilityUsageCosts[1]): void {
    this.usageCost = cost;
    this.triggerUpdate();
  }

  handleUsageRestrictionUpdate(restriction: typeof customAbilitiesJson.abilityUsageRestriction[0]): void {
    this.usageRestriction = restriction;
    this.triggerUpdate();
  }

  handleTargetsUpdate(target: typeof customAbilitiesJson.targets[0]): void {
    this.targets = target;
    this.triggerUpdate();
  }

  private triggerUpdate(): void {
    this.abilityChange.emit({
      name: this.getAbilityName(),
      pointsCost: this.calculatePointsCost(),
      apCost: this.usageCost.apCost,
      mpCost: 0,
      description: this.getDescription()
    });
  }

  private getAbilityName(): string {
    if (this.usageRestriction.abilityUsageRestriction === 'None') {
      return this.name;
    } else {
      return this.name + ' ' + this.usageRestriction;
    }
  }

  private getDescription(): string {
    return ''; // TODO substitude spell or martial specific stuff.
  }
}
