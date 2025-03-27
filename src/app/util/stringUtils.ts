import { DiceExpression } from './DiceExpression';

export function toStringSigned(n?: number): string {
  if (n) {
      return n >= 0 ? '+' + n : '' + n;
  }
  return '';
}

export function toStringDiceExpression(diceExpression: DiceExpression): string {
  return diceExpression.dice.map(d => d.amount + d.die).join('+') + toStringSigned(diceExpression.constant);
}