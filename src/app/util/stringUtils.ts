import { AttributeModifiers } from "./model/AttributeModifiers";
import { DiceExpression } from './model/DiceExpression';

export function toStringSigned(n?: number): string {
  if (n) {
      return n >= 0 ? '+' + n : '' + n;
  }
  return '';
}

export function toStringAttributeModifiers(attributes: AttributeModifiers, displayZero: boolean = true): string {
  let attributeString = 
    (attributes.str !== 0 || displayZero ? 'STR: ' + toStringSigned(attributes.str) + ', ' : '') +
    (attributes.agi !== 0 || displayZero ? 'AGI: ' + toStringSigned(attributes.agi) + ', ' : '') +
    (attributes.con !== 0 || displayZero ? 'CON: ' + toStringSigned(attributes.con) + ', ' : '') +
    (attributes.int !== 0 || displayZero ? 'INT: ' + toStringSigned(attributes.int) + ', ' : '') +
    (attributes.spi !== 0 || displayZero ? 'SPI: ' + toStringSigned(attributes.spi) + ', ' : '') +
    (attributes.per !== 0 || displayZero ? 'PER: ' + toStringSigned(attributes.per) + ', ' : '') +
    (attributes.cha !== 0 || displayZero ? 'CHA: ' + toStringSigned(attributes.cha) + ', ' : '');

  return attributeString.substring(0, attributeString.length - 2);
}

export function toStringDiceExpression(diceExpression: DiceExpression): string {
  return diceExpression.dice.map(d => d.amount + d.die).join('+') + toStringSigned(diceExpression.constant);
}