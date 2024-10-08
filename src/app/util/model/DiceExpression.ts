export type DiceExpression = {
    dice: DieExpression[],
    constant: number
}

export type DieExpression = {
    amount: number,
    die: Die
}

export enum Die {
    D4 = 'd4', D6 = 'd6', D8 = 'd8', D10 = 'd10', D12 = 'd12', D20 = 'd20'
}