export enum Alignment {
    LawfulGood = 'Lawful Good',
    LawfulNeutral = 'Lawful Neutral',
    LawfulEvil = 'Lawful Evil',
    NeutralGood = 'Neutral Good',
    Neutral = 'Neutral',
    NeutralEvil = 'Neutral Evil',
    ChaoticGood = 'Chaotic Good',
    ChaoticNeutral = 'Chaotic Neutral',
    ChaoticEvil = 'Chaotic Evil',
    Unaligned = 'Unaligned',
    Any = 'Any'
}

export const alignments: Alignment[] = [
    Alignment.Unaligned, 
    Alignment.LawfulGood, 
    Alignment.LawfulNeutral, 
    Alignment.LawfulEvil, 
    Alignment.NeutralGood, 
    Alignment.Neutral, 
    Alignment.NeutralEvil, 
    Alignment.ChaoticGood,
    Alignment.ChaoticNeutral,
    Alignment.ChaoticEvil,
    Alignment.Any
  ]