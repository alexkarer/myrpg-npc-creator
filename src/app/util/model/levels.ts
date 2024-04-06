export type LevelConfig = {
    level: number,
    points: number,
    AP: number,
    XP: number
}

export const levelConfigs: LevelConfig[] = [
    { level: 0.25, points: 1, AP: 2, XP: 12 },
    { level: 0.5, points: 2, AP: 2, XP: 25 },
    { level: 1, points: 3, AP: 3, XP: 50 },
    { level: 2, points: 4, AP: 3, XP: 100 },
    { level: 3, points: 5, AP: 3, XP: 200 },
    { level: 4, points: 6, AP: 4, XP: 400 },
    { level: 5, points: 7, AP: 4, XP: 800 },
    { level: 6, points: 8, AP: 4, XP: 1400 },
    { level: 7, points: 9, AP: 4, XP: 2500 },
    { level: 8, points: 10, AP: 5, XP: 4000 },
    { level: 9, points: 12, AP: 5, XP: 6000 },
    { level: 10, points: 12, AP: 5, XP: 9000 },
    { level: 11, points: 13, AP: 5, XP: 13000 },
    { level: 12, points: 14, AP: 6, XP: 20000 },
    { level: 13, points: 15, AP: 6, XP: 30000 },
    { level: 14, points: 16, AP: 6, XP: 42000 },
    { level: 15, points: 17, AP: 6, XP: 55000 },
    { level: 16, points: 18, AP: 7, XP: 70000 },
    { level: 17, points: 19, AP: 7, XP: 90000 },
    { level: 18, points: 20, AP: 7, XP: 120000 },
    { level: 19, points: 21, AP: 7, XP: 160000 },
    { level: 20, points: 22, AP: 8, XP: 220000 },
]