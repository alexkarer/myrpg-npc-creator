# NPC Creation Concept

You choose Level and archetype which determinse your base stats and proficencies and also gives you an amount of poitns you can spend for traits, gear and abilities.

#### Order

1. Choose Level of creature
2. Choose Archetype: Warrior, Expert, Spellcaster
3. Choose Creature Type and Size (spend points)
4. Choose Attribute Boost and Skill Boost (no cost)
5. Spend points for Traits and Gear 
6. Spend points for Abilities

### 1. Choose Level

The Level you choose determines your Creation Points as well as XP reward 

### 2. Choose Archetype

**Archetypes**
- Warror: Martial oriented Character, Good Base Stats and Defenses but not many NPC Creation Points and Skills
- Expert: Versatile Character, alraight Base Stats and Defenses and many NPC Creation Points and Skills
- Spellcaster: Spell focused caster, alraight Base Stats and weak Defenses and many NPC Creation Points and few skills

Archetype determines the following:
- Attribute Set (based on Level)
- Defenses
- HpBonus
- Spell Level / Martial Level
- NPC Creation Points

### 3. Choose Creature Type and Size

**Size**
Size modifies the following things:
- Dodge
- STR
- Melee Range
- Movement
- Space you occupy

Choosing a larger Size than medium will cost creation points.

**Creature Type:**
A base type and a sub-type can be chosen.
A creature type, base or sub-type can affect the following things:
- free traits
- immunities/resistances/vunlurabilities
- status effect immunities
- attribute bonuses
- if base type, set availible sub-types

Certain creature types costs points

### 4. Choose Attribute Boost and Skill Boost

**Attribute Boost**
1 Attribute can be boosted by 2
1 other Attribute can be boosted by 1

**Skills**
Additionally a set of skills can be boosted. For each int you can boost one skill
- each skill can be boosted twice, gives each (LEVEL/2) + 1 bonus

### 5. Spend Points for Traits and Gear

Various Traits to buy abilities and gear

### 6. Spend Points for Abilities

Abilities are not predefined but can be created and consist fo the following components:
Abilities also have ability creation points, one npc creation point should grant a certain amount of ability creation points

**Ability Type**
- Martial
- Spell

**Ability Cost**
- 1 AP, +2
- 2 AP, 0
- 3 AP, -2,
- 4 AP, -4,
- 5 AP, -6,
- 6 AP, -8

**Ability Usage modifier**
- 1/TURN, can only be used for 1 [AP] abilities: -1
- Cooldown(2): -2
- Cooldown(3): -3
- Once per Encounter: -5

**Targets**
- single target melee, 0
- single target ranged, +1
- melee, cleave, +1
- 2 targets ranged, +3
- 3 targets ranged, +4
- line (1.5m, 6m), +2
- line (1.5m, 12m), +4
- cone (4.5m), +2
- cone (9m), +4
- cone (15m), +6
- ranged sphere (1.5m), +2
- ranged sphere (3m), +4
- ranged sphere (4.5m), +5
- ranged sphere (6m), +6
- ranged sphere (9m), +7

for AOE can choose between, dodge, toughness, willpower

**Main Effect**
- light damage, -1
- medium damage, 0
- heavy damage, 1
- 2x medium damage, 2
- 2x heavy damage, 4
- 3x heavy damage, 6
- afflict tier I status effect, -1
- afflict tier II status effect, 2
- afflict tier III status effect, 6

Additionally status effects have save neds
if save succeeds status effect drops to one worse tier (also initial).

**Side Effects**
- light dmage, 2
- push, STR or SPI m, 1
- knock prone, 2
- afflict tier I status effect, +2
- afflict tier II status effect, +6
- afflict tier III status effect, +10
- life steal, heal for halve damage done, 2

conditions last [LEVEL]/2 Turns, min 2
damage types should be just a free choice.

**Movement Abilities**
Movement abilities should be predifined

**Reactions**
Reaction abilities should be predifined 

**Other**
There should be an additional set of predefined abilities that do not fit anywhere else or are to complicated to model with the abilitiy builder.