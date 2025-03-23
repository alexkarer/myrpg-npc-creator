import { Component, Input } from '@angular/core';
import { toStringAttributeModifiers, toStringDiceExpression, toStringSigned } from '../../../util/stringUtils';
import { BaseStatArray } from '../../../util/model/baseStatArray';
import { DiceExpression } from '../../../util/model/DiceExpression';

@Component({
    selector: 'app-base-stat-array-info',
    imports: [],
    templateUrl: './base-stat-array-info.component.html',
    styleUrl: './base-stat-array-info.component.scss'
})
export class BaseStatArrayInfoComponent {

  @Input() baseStatArray?: BaseStatArray;

  attributeModifiers(): string {
    if (this.baseStatArray?.attributeModifiers) {
      return toStringAttributeModifiers(this.baseStatArray?.attributeModifiers, false);
    }
    return '';
  }

  toStringSigned(n?: number): string {
    if (n) {
      return toStringSigned(n);
    }
    return '';
  }

  toStringDiceExpression(diceExpr?: DiceExpression): string {
    if (diceExpr) {
      return toStringDiceExpression(diceExpr);
    }
    return '';
  }
}
