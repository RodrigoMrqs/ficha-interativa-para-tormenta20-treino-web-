export type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100

export function roll(sides: DiceType): number {
    return Math.floor(Math.random() * sides) + 1
}

export const rollD4 = () => roll(4)
export const rollD6 = () => roll(6)
export const rollD8 = () => roll(8)
export const rollD10 = () => roll(10)
export const rollD12 = () => roll(12)
export const rollD20 = () => roll(20)
export const rollD100 = () => roll(100)