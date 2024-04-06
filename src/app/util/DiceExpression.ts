export type DiceExpression = {
    dice: DieExpression[],
    constant: number
}

export type DieExpression = {
    amount: number,
    die: Die
}

export enum Die {
    D4, D6, D8, D10, D12, D20
}